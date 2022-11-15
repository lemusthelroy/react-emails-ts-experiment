import fs from "fs";
import fetch from "node-fetch";

const handler = async (event, context) => {
  const readStream = fs.createReadStream("./assets/dummy.pdf");
  // convert stream to base64
  const chunks: Uint8Array[] = [];
  for await (const chunk of readStream) {
    chunks.push(chunk);
  }
  const base64 = Buffer.concat(chunks).toString("base64");

  // Call netlify emails function to send email
  const response = await fetch(
    `${process.env.URL}/.netlify/functions/emails/hello`,
    {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
      },
      method: "POST",
      body: JSON.stringify({
        to: "lewis.john.thorley@gmail.com",
        from: "lewisBADTEST@reflr.io",
        subject: "Test email",
        attachments: [
          { content: base64, filename: "dummy.pdf", type: "application/pdf" },
        ],
        parameters: {
          name: "Lewis",
        },
      }),
    }
  );

  return {
    statusCode: response.status,
    body: JSON.stringify({ message: "Email sent" }),
  };
};

export { handler };
