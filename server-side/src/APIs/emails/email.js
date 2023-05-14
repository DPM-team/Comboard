/**
 * This is the class that represents the email to be sent.
 * It has as fields as much data as the sendGrid API needs to know.
 */
class Email {
  #to;
  #from;
  #subject;
  #html;

  /**
   *
   * @param {string} to The recipient's email
   * @param {string} from The sender's email
   * @param {string} subject The subject of the email to be sent.
   * @param {string} html The main body of the email, in the form of html code, thus giving possibilities for better content.
   * @returns {Email} An email instance is returned
   */
  constructor(to, from, subject, html) {
    this.#to = to;
    this.#from = from;
    this.#subject = subject;
    this.#html = html;
  }

  get to() {
    return this.#to;
  }

  get from() {
    return this.#from;
  }

  get subject() {
    return this.#subject;
  }

  get html() {
    return this.#html;
  }
  static returnForgotPasswordTemplate(param) {
    return `
    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: inherit;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
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
    ul ul ul ul  {
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
    @media screen and (max-width:480px) {
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
      <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Chivo&amp;display=swap" rel="stylesheet"><style>
body {font-family: 'Chivo', sans-serif;}
</style><!--End Head user entered-->
    <style type="text/css" id="operaUserStyle"></style></head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tbody><tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody><tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tbody><tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tbody><tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tbody><tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2bbeef9b-0f8d-4715-a522-28ccdf1790d7">
    <tbody>
      <tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="#0a3c5f">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="27807dea-f1fb-4191-92a8-9393b92cbc12">
    <tbody>
      <tr>
        <td height="100%" valign="top" role="module-content"></td>
      </tr>
    </tbody>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a8a420f-bc0f-4307-bd09-412a5ff00998">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;" width="240" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/ae501edd5253fef6/6ada05eb-c1fd-4aa2-88ae-2fe81c982e06/8335x5834.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2bbeef9b-0f8d-4715-a522-28ccdf1790d7.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="#0a3c5f">
        </td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 0px 0px 30px;" bgcolor="#ffffff" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="550" style="width:550px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8a6da06-629b-4b1f-a750-84744e679927">
    <tbody>
      <tr>
        <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 40px 0px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 24px; color: #0a3c5f">We received a request to reset your password.</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 40px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Use the following code to restore your account and update your password:</div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1.2" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 40px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">${param}</div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f">
    <tbody>
      <tr>
        <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 60px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16a4afb-f245-4156-968e-8080176990ea.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 40px 10px 0px; line-height:18px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">If you did not request a password change, please contact us</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">IMMEDIATELY so</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">&nbsp;we can keep your account secure.</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #00634a"><br>
</span></div>
<div style="font-family: inherit; text-align: inherit"><br></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #00634a">&nbsp;Email us at dpmcomboard@gmail.com</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c97177b8-c172-4c4b-b5bd-7604cde23e3f.1.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 80px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="38ec2680-c847-4765-8c5f-aa2aba19a2b3">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="7px" style="line-height:7px; font-size:7px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 7px 0px;" bgcolor="#ffffff"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a8a420f-bc0f-4307-bd09-412a5ff00998.1">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/ae501edd5253fef6/9c7ad320-75f3-4625-9849-1c881116ee7b/600x50.png">
        </td>
      </tr>
    </tbody>
  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a target="_blank" class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="840a78da-be53-493f-8903-70244289fe77">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="https://sendgrid.com/" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY TWILIO SENDGRID</a></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
                                      </tr>
                                    </tbody></table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table>
        </div>
      </center>
    
  </body></html>`;
  }
}

module.exports = Email;
