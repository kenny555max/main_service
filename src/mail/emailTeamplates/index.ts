export const emailTemplates = {
  successfulTransactionNotification: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
            <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG />
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
            body {
                width: 600px;
                margin: 0 auto;
            }
            table {
                border-collapse: collapse;
            }
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
            }
            </style>
        <![endif]-->
        <style type="text/css">
        body,
        p,
        div {
            font-family: inherit;
            font-size: 14px;
        }

        body {
            color: #000000;
        }

        body a {
            color: #1188e6;
            text-decoration: none;
        }

        p {
            margin: 0;
            padding: 0;
        }

        table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        img.max-width {
            max-width: 100% !important;
        }

        .column.of-2 {
            width: 50%;
        }

        .column.of-3 {
            width: 33.333%;
        }

        .column.of-4 {
            width: 25%;
        }

        ul ul ul ul {
            list-style-type: disc !important;
        }

        ol ol {
            list-style-type: lower-roman !important;
        }

        ol ol ol {
            list-style-type: lower-latin !important;
        }

        ol ol ol ol {
            list-style-type: decimal !important;
        }

        @media screen and (max-width: 480px) {

            .preheader .rightColumnContent,
            .footer .rightColumnContent {
            text-align: left !important;
            }

            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
            text-align: left !important;
            }

            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
            }

            table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
            }

            img.max-width {
            height: auto !important;
            max-width: 100% !important;
            }

            a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
            }

            .columns {
            width: 100% !important;
            }

            .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            }

            .social-icon-column {
            display: inline-block !important;
            }
        }

        </style>
        <!--user entered Head Start-->
        <link href="https://fonts.googleapis.com/css?family=Chivo&display=swap" rel="stylesheet" />
        <style>
        body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                line-height: 1.6;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h1 {
                color: #333;
            }

            ul {
                padding-left: 20px;
            }

            li {
                margin-bottom: 10px;
            }

            .advertisement {
                margin-top: 20px;
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .advert-title {
                color: #333;
                margin-top: 0;
            }

            .advert-description {
                color: #555;
            }

            .advert-link {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff !important;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
        <!--End Head user entered-->
    </head>

    <body>
        <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">

            {{{body}}}

        </div>
        </center>
    </body>

        </html>`,
};
