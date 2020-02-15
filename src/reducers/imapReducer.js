import {
    GET_EMAILS_START,
    GET_EMAILS_SUCCESS,
    GET_EMAILS_FAILURE,
    EMAILS_UPDATE_START,
    EMAILS_UPDATE_SUCCESS,
    EMAILS_UPDATE_FAILURE,
    INCREMENT_STREAM_COUNTER
} from "../actions";

// const sampleEmail = {
//   id: 7,
//   message_id: "<CALdeV-vfB+d05=iLtk6H_VH-CA41+LLfm-5-iOpq6hBbcoAp3A@mail.gmail.com>",
//   from: "natemosco@gmail.com",
//   name: "Nathaniel Mosco",
//   to: "taggerlabs20@gmail.com",
//   subject: "Human email 1",
//   email_body: `"<div dir="ltr">Hey everyone. (^_^)<div><br></div><div>What do you think?</div></div>↵"`,
//   email_body_text: "Hey everyone. (^_^)↵↵What do you think?↵",
//   date: "1580339062000.0",
//   uid: "20",
//   user_id: 1,
// };
// const sampleEmail1 = {
//   id: 6,
//   message_id: "<CAOyDN6VEKvr7zssiDP-Ra7jdXBwPHvOk4+L_9dCCx5bVnGkYxw@mail.gmail.com>",
//   from: "vladmog@gmail.com",
//   name: "Vlad M",
//   to: "taggerlabs20@gmail.com",
//   subject: "A test",
//   email_body: `"<div dir="ltr">Yoohooo</div>↵"`,
//   email_body_text: "Yoohooo↵",
//   date: "1580316936000.0",
//   uid: "18",
//   user_id: 1,
// };
// const sampleEmail2 = {
//   id: 10,
//   message_id: "<0101016ff7cc9d0b-13345fee-256a-4105-9e84-d64d553be3ea-000000@us-west-2.amazonses.com>",
//   from: "now@zeit.co",
//   name: "ZEIT",
//   to: "taggerlabs20@gmail.com",
//   subject: `ZEIT Sign Up Verification (code: "Rare Caterpillar")`,
//   email_body: `"↵<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">↵  <tr><td align="center">↵<table style="; border:1px solid #eaeaea;border-radius:5px;margin:40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">↵  <tr><td align="center"><div style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;text-align:left;width:465px;">↵↵<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">↵  <tr><td align="center">↵  <div><img src="https://assets.zeit.co/email/zeit-logo.png" width="40" height="37" alt="ZEIT" /></div>↵  <h1 style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:24px;font-weight:normal;margin:30px 0;padding:0;">Verify your email to sign up for <b>ZEIT</b></h1>↵</td></tr>↵</table>↵↵<p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">We have received a signup attempt from Calipatria, United States with the following code:</p>↵<br/>↵↵<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">↵  <tr>↵    <td align="center" bgcolor="#f6f6f6" valign="middle" height="40" style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:16px;font-weight:bold;">Rare Caterpillar</td>↵  </tr>↵</table>↵↵<br/>↵<p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">To complete the signup process, please click on the button below. Please note that by completing your signup you are agreeing to our <a href="https://zeit.co/terms" target="_blank" style="color:#067df7;text-decoration:none;">Terms of Service</a> and <a href="https://zeit.co/privacy" target="_blank" style="color:#067df7;text-decoration:none;">Privacy Policy</a>:</p>↵<br/>↵↵<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">↵  <tr><td align="center">↵<div>↵  <!--[if mso]>↵  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://zeit.co/confirm?email=taggerlabs20%40gmail.com&amp;token=OuG9X1K3ecUSvz4A1In699di&amp;mode=signup" style="height:50px;width:200px;v-text-anchor:middle;" arcsize="10%" stroke="f" fillcolor="#000">↵    <w:anchorlock/>↵    <center>↵  <![endif]-->↵    <a href="https://zeit.co/confirm?email=taggerlabs20%40gmail.com&amp;token=OuG9X1K3ecUSvz4A1In699di&amp;mode=signup" target="_blank" style="background-color:#000;border-radius:5px;color:#fff;display:inline-block;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:12px;font-weight:500;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">VERIFY</a>↵  <!--[if mso]>↵    </center>↵  </v:roundrect>↵  <![endif]-->↵</div>↵</td></tr>↵</table>↵↵<br/>↵<p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">Or copy and paste this URL into a new tab of your browser:</p>↵<p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;"><a href="https://zeit.co/confirm?email=taggerlabs20%40gmail.com&amp;token=OuG9X1K3ecUSvz4A1In699di&amp;mode=signup" target="_blank" style="color:#067df7;text-decoration:none;">https://zeit.co/confirm?email=taggerlabs20%40gmail.com&amp;token=OuG9X1K3ecUSvz4A1In699di&amp;mode=signup</a></p>↵<br/>↵<hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%;"></hr>↵<p style="color:#666666;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:12px;line-height:24px;">If you didn't attempt to sign up but received this email, or if the location doesn't match, please ignore↵this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.</p>↵</div></td></tr>↵</table>↵</td></tr>↵</table>↵"`,
//   email_body_text: "↵Verify your email to sign up for ZEIT↵↵We have received a signup attempt from Calipatria, United States with the code:↵↵Rare Caterpillar↵↵To complete the signup process, please click on the URL below. Please note that by completing your signup you are agreeing to our Terms of Service (https://zeit.co/terms) and Privacy Policy (https://zeit.co/privacy):↵↵https://zeit.co/confirm?email=taggerlabs20%40gmail.com&token=OuG9X1K3ecUSvz4A1In699di&mode=signup↵↵Or copy and paste this URL into a new tab of your browser.↵↵↵--------------------------------------↵↵If you didn't attempt to sign up but received this email, or if the location doesn't match, please ignore this email. If you are concerned about your account's safety, please reply to thi email to get in touch with us.↵",
//   date: "1580410379000.0",
//   uid: "25",
//   user_id: 1,
// };
// const sampleEmail3 = {
//   id: 12,
//   message_id: "<fbfa8428-3f74-4639-9a8b-1f17f598b9e8@xtgap4s7mta1151.xt.local>",
//   from: "no-reply@heroku.com",
//   name: "Heroku",
//   to: "taggerlabs20@gmail.com",
//   subject: "Extend your app in a couple of clicks with Heroku Add-ons",
//   email_body: `↵<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Tran`,
//   email_body_text: "Wondering where to start? Here’s a selection of popular add-ons to explore as you develop, operate, and manage your apps.↵↵View in Browser↵https://hello.heroku.com/webmail/36622/923973305/35b8404ed45b737fd6c1ab3cafbb991409428df23042494bc92d88d830c4daf5↵↵---↵↵Hi LabsTwenty,↵↵Heroku Add-ons help you build apps faster by providing access to fully managed, third-party cloud services from our ecosystem partners. Choose from 175+ add-ons available in the Elements Marketplace, or get started with a few developer favorites below.↵(https://hello.heroku.com/e/36622/35cEi2m/lsmlsx/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵---↵↵Try these popular Heroku Add-ons:↵↵JawsDB MySQL - Great for large and growing apps, this popular database is single tenant and takes daily backups.↵• Get JawsDB (https://hello.heroku.com/e/36622/38jUsJ0/lsmlsz/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Data Store add-ons (https://hello.heroku.com/e/36622/2RPHvB6/lsmlt2/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Trevor.io Query Builder - With a point and click UI, enable anyone on your team to run SQL queries without coding a thing.↵• Get Trevor.io (https://hello.heroku.com/e/36622/2PtdB2E/lsmlt4/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Data Store Utility add-ons (https://hello.heroku.com/e/36622/34lUHQy/lsmlt6/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Sqreen - Build real-time security monitoring that’s SOC2 and GDPR-compliant into your app, and integrate with popular tools.↵• Get Sqreen (https://hello.heroku.com/e/36622/35b3eHt/lsmlt8/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Security add-ons (https://hello.heroku.com/e/36622/2LOFxgk/lsmltb/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Parrot QA - Easily map out tests to find bugs before they hit production, and automatically run tests on every deployment to Heroku.↵• Get Parrot QA (https://hello.heroku.com/e/36622/2ryP0BA/lsmltd/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Testing add-ons (https://hello.heroku.com/e/36622/2LSJAZ8/lsmltg/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Coralogix - Query your log data in seconds. All plans offer a full feature set, and new users get the first 12GB free.↵• Get Coralogix (https://hello.heroku.com/e/36622/2PxDVZr/lsmltj/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Logging add-ons (https://hello.heroku.com/e/36622/2ROABMn/lsmltl/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Scout APM - Integrating seamlessly with GitHub, Scout APM helps you find and troubleshoot issues at the code line level.↵• Get Scout APM (https://hello.heroku.com/e/36622/38qGGEI/lsmltn/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵• View all Monitoring add-ons (https://hello.heroku.com/e/36622/2Pj1Vk7/lsmltq/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵---↵↵Browse All Heroku Add-ons↵(https://hello.heroku.com/e/36622/35cEi2m/lsmlsx/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵---↵↵Find documentation in the Dev Center regarding specific add-ons and how to use them.↵(https://hello.heroku.com/e/36622/38oEfCo/lsmlts/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM)↵↵Happy coding,↵The Heroku Team↵↵---↵↵Salesforce↵415 Mission Street, 3rd Floor↵​​​​​​​San Francisco, CA 94105↵↵Update your email preferences↵https://hello.heroku.com/KeepMeuptoDate?ehash=35b8404ed45b737fd6c1ab3cafbb991409428df23042494bc92d88d830c4daf5&email_id=923973305&epc_hash=s8f_F0MVw_qcKJeBBEQU_C7zr9WF7ssiO864EkmZkjQ↵Privacy↵https://hello.heroku.com/e/36622/company-privacy/lsmltv/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵↵https://hello.heroku.com/e/36622/2020-02-03/lstqbn/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵https://hello.heroku.com/e/36622/heroku/lsmltz/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵https://hello.heroku.com/e/36622/heroku/lsmlv2/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵https://hello.heroku.com/e/36622/heroku/lsmlv4/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵https://hello.heroku.com/e/36622/heroku/lsmlv6/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵https://hello.heroku.com/e/36622/company-heroku/lsmlv8/923973305?h=C_JP-ei-7Ql_48kMVrGHMZL9wfFPckKR2bqrOx_vIxM↵",
//   date: "1580754764000.0",
//   uid: "29",
//   user_id: 1,
// };
// const sampleEmail4 = {
//   id: 16,
//   message_id: "<CAL4+WQO3_xSYukucKrR2AvanND5aUKabEUzZ27s_8qFosrL=fg@mail.gmail.com>",
//   from: "lflores02142@gmail.com",
//   name: "Luis Flores",
//   to: "taggerlabs20@gmail.com",
//   subject: "Re: test",
//   email_body: `<div dir="ltr">Got it! <br></div><br><div class="gmail_quote"><div dir="ltr" class="gmail_attr">On Tue, Feb 4, 2020 at 2:07 PM &lt;<a href="mailto:taggerlabs20@gmail.com">taggerlabs20@gmail.com</a>&gt; wrote:<br></div><blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex;border-left-width:1px;border-left-style:solid;border-left-color:rgb(204,204,204);padding-left:1ex"><div><p>this is a test</p></div>↵</blockquote></div>↵`,
//   email_body_text: "Got it!↵↵On Tue, Feb 4, 2020 at 2:07 PM <taggerlabs20@gmail.com> wrote:↵↵> this is a test↵>↵",
//   date: "1580854093000.0",
//   uid: "38",
//   user_id: 1,
// };

// const initialState = {
//     areEmailsRetrieved: true,
//     areEmailsUpdated: true, //todo: get a fn that changes this to false on button press or a timer with useEffect that reRuns the Update
//     streamCounter:0,
//     emails: [sampleEmail, sampleEmail1, sampleEmail2, sampleEmail3, sampleEmail4],
//     retrieveErrors: null,
//     updateErrors: null
// };
const initialState = {
    areEmailsRetrieved: false,
    areEmailsUpdated: false, //todo: get a fn that changes this to false on button press or a timer with useEffect that reRuns the Update
    streamCounter: 0,
    emails: [],
    retrieveErrors: null,
    updateErrors: null
};

export const imapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // ==============================================
        //           GET USER EMAILS
        case GET_EMAILS_START:
            return {
                ...state,
                areEmailsRetrieved: false,
                retrieveErrors: null
            };
        case GET_EMAILS_SUCCESS:
            return {
                ...state,
                emails: [...state.emails, ...payload],
                areEmailsRetrieved: true,
                retrieveErrors: null
            };
        case GET_EMAILS_FAILURE:
            return {
                ...state,
                areEmailsRetrieved: false,
                retrieveErrors: payload
            };
        //=========================================
        //     CHECK IF UPDATED BEFORE FETCHING EMAILS
        case EMAILS_UPDATE_START:
            return {
                ...state,
                areEmailsUpdated: false,
                updateErrors: null
            };
        case EMAILS_UPDATE_SUCCESS:
            return {
                ...state,
                areEmailsUpdated: true,
                updateErrors: null
            };
        case EMAILS_UPDATE_FAILURE:
            return {
                ...state,
                areEmailsUpdated: false,
                updateErrors: payload
            };
        //================================================
        // Increase stream Counter
        case INCREMENT_STREAM_COUNTER:
            return {
                ...state,
                streamCounter: (state.streamCounter += 1)
            };
        default:
            return state;
    }
};
