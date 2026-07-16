export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.FRONTEND_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, corsHeaders);
      }

      if (url.pathname === "/api/contact") return await handleContact(request, env, corsHeaders);
      if (url.pathname === "/api/hire") return await handleHire(request, env, corsHeaders);

      return json({ error: "Not found" }, 404, corsHeaders);
    } catch (err) {
      console.error(err);
      return json({ error: "Server error handling request. Please try again later." }, 500, corsHeaders);
    }
  },
};

async function handleContact(request, env, corsHeaders) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "Invalid JSON body" }, 400, corsHeaders);

  const name = trim(body.name);
  const email = trim(body.email);
  const subject = trim(body.subject);
  const message = trim(body.message);

  if (!name || !email || !subject || !message) {
    return json({ error: "name, email, subject, and message are required fields." }, 400, corsHeaders);
  }

  let storedInDatabase = false;
  if (env.MONGODB_WRITE_URL) {
    const r = await fetch(env.MONGODB_WRITE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mongodbUri: env.MONGODB_URI,
        collection: "contact",
        document: { name, email, subject, message, createdAt: new Date().toISOString() },
      }),
    });
    storedInDatabase = r.ok;
  }

  const to = env.CONTACT_TO || env.EMAIL_TO;
  if (!to) return json({ error: "Missing CONTACT_TO/EMAIL_TO." }, 500, corsHeaders);
  if (!env.EMAIL) return json({ error: "Missing env.EMAIL binding." }, 500, corsHeaders);

  const emailSubject = `📬 Contact: ${subject} — ${name}`;
  const emailText = [
    "New contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const emailHtml = `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(emailText)}</pre>`;

  await env.EMAIL.send({
    to,
    from: env.CONTACT_FROM || env.EMAIL_FROM || to,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  });

  return json({ success: true, message: "Message sent successfully!", storedInDatabase, emailNotification: true }, 200, corsHeaders);
}

async function handleHire(request, env, corsHeaders) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: "Invalid JSON body" }, 400, corsHeaders);

  const name = trim(body.name);
  const email = trim(body.email);
  const phone = trim(body.phone);
  const service = trim(body.service);
  const budget = trim(body.budget);
  const timeline = trim(body.timeline);
  const details = trim(body.details);

  if (!name || !email || !service || !budget || !details) {
    return json({ error: "Name, email, service, budget, and details are required fields." }, 400, corsHeaders);
  }

  let storedInDatabase = false;
  if (env.MONGODB_WRITE_URL) {
    const r = await fetch(env.MONGODB_WRITE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mongodbUri: env.MONGODB_URI,
        collection: "hire",
        document: { name, email, phone, service, budget, timeline, details, createdAt: new Date().toISOString() },
      }),
    });
    storedInDatabase = r.ok;
  }

  const to = env.HIRE_TO || env.EMAIL_TO;
  if (!to) return json({ error: "Missing HIRE_TO/EMAIL_TO." }, 500, corsHeaders);
  if (!env.EMAIL) return json({ error: "Missing env.EMAIL binding." }, 500, corsHeaders);

  const emailSubject = `💼 Hire Request: ${service} — ${name}`;
  const emailText = [
    "New hire inquiry received",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline || "Not specified"}`,
    "",
    "Details:",
    details,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const emailHtml = `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(emailText)}</pre>`;

  await env.EMAIL.send({
    to,
    from: env.HIRE_FROM || env.EMAIL_FROM || to,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  });

  return json({ success: true, message: "Hiring inquiry submitted successfully!", storedInDatabase, emailNotification: true }, 200, corsHeaders);
}

function trim(v) {
  return typeof v === "string" ? v.trim() : "";
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
  });
}

function escapeHtml(s) {
  const str = String(s);
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', """)
    .replaceAll("'", "&#039;");
}

