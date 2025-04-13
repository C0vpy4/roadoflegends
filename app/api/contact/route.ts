import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Создаем транспорт для отправки писем
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Создаем HTML-шаблон
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
          <meta charset="UTF-8">
          <title>Новая заявка на тур Road of Legends</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #333; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .info-item { margin-bottom: 15px; }
              .info-label { font-weight: bold; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Road of Legends</h1>
                  <p>Новая заявка на тур</p>
              </div>
              
              <div class="content">
                  <div class="info-item">
                      <div class="info-label">ФИО:</div>
                      <div>${formData.name}</div>
                  </div>
                  
                  <div class="info-item">
                      <div class="info-label">Количество человек:</div>
                      <div>${formData.people || "Не указано"}</div>
                  </div>
                  
                  <div class="info-item">
                      <div class="info-label">Номер тура:</div>
                      <div>${formData.tour || "Не указано"}</div>
                  </div>
                  
                  <div class="info-item">
                      <div class="info-label">Телефон:</div>
                      <div>${formData.phone}</div>
                  </div>
                  
                  <div class="info-item">
                      <div class="info-label">Email:</div>
                      <div>${formData.email || "Не указан"}</div>
                  </div>
                  
                  <div class="info-item">
                      <div class="info-label">Пожелания:</div>
                      <div>${formData.wishes || "Нет пожеланий"}</div>
                  </div>
              </div>
              
              <div class="footer">
                  <p>© Road of Legends. Все права защищены.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Отправляем письмо
    await transporter.sendMail({
      from: '"Road of Legends" <noreply@roadoflegends.com>',
      to: process.env.RECIPIENT_EMAIL,
      subject: "Новая заявка на тур Road of Legends",
      html: htmlTemplate,
      replyTo: formData.email || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка отправки письма" },
      { status: 500 }
    );
  }
}
