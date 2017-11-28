const generateHeader = (dateTime) => `
<mj-section background-color="#FFFFFF" padding="0 0 10px 0" >

  <mj-group width="100%" vertical-align="middle">

    <mj-column width="80%">
       <mj-text line-height='16px' padding="12px">
        <p style="font-size: 22px; font-weight: 400; color: #4A4A4A; font-family: Lato, Arial, sans-serif;" >
          Snow Update
        </p>
        <p style="font-size: 14px; font-weight: 300; color: #9B9B9B; font-family: Lato, Arial, sans-serif;">
          ${dateTime}
        </p>
      </mj-text>
    </mj-column>

    <mj-column width="20%">
      <mj-image  align="right" padding="18px 6px 0 0" width="32px" src="http://www.slope.ninja/emailAssets/logo.png"></mj-image>
    </mj-column>

  </mj-group>

</mj-section>
`;

const generateFooter = () => `
<mj-section background-color="#1ED2FF" background-repeat="repeat" padding="10px 0 0 0" text-align="center" vertical-align="top">

  <mj-group width="100%">
    <mj-column>
      <mj-image align="right" padding="24px 10px 0 0" width="110px" height="36px" src="http://www.slope.ninja/emailAssets/appStore.png" href="https://itunes.apple.com/us/app/slope-ninja/id1297809634?ls=1&mt=8">
      </mj-image>

    </mj-column>
     <mj-column>
      <mj-image align="left" padding="24px 0 0 10px" width="110px" height="36px" src="http://www.slope.ninja/emailAssets/playStore.png" href="https://play.google.com/store/apps/details?id=ninja.slope.app"></mj-image>
    </mj-column>
  </mj-group>

  <mj-column width="100%">
    <mj-text align="center" color="#ffffff" font-family="Lato, Arial, sans-serif" font-size="16px" font-weight="300" line-height="22px" padding="22px 25px 10px 25px">
      (c) Slope Ninja. All rights reserved.
    </mj-text>

    <mj-text align="left" color="#ffffff" font-family="Lato, Arial, sans-serif" font-size="12px" font-weight="300" line-height="16px" padding="10px 12px 0 12px">
      You receive this email because you have once subscribed to snow alerts on Slope Ninja.
    </mj-text>
    <mj-text align="left" color="#ffffff" font-family="Lato, Arial, sans-serif" font-size="12px" font-weight="300" line-height="16px" padding="10px 12px 0 12px">
     <a style="color:#ffffff" href="*|UNSUB|*">Unsubscribe</a>
    </mj-text>

  </mj-column>

   <mj-group width="100%">
    <mj-column>
      <mj-image align="right" padding="0 0 0 0" width="110px" src="http://www.slope.ninja/emailAssets/moutains.png"></mj-image>
    </mj-column>
  </mj-group>

</mj-section>
`;

const generateRows = (resortRows) => resortRows.map(row => `
  <tr style="border-bottom: 1px solid #EDEDED;">
    <td style="padding: 12px 0 6px 0;">
      <img style="width: 22px" src=${row.resortLogoUrl} />
    </td>
    <td style="padding: 12px 0 6px 0;">
      <a style="font-size: 14px; font-weight: 400; color: #4A4A4A; font-family: Lato, Arial, sans-serif;" href="${row.resortUrl}" target="_blank">${row.resortName}</a>
    </td>
    <td style="padding: 12px 0 6px 0; font-size: 16px; font-weight: 300; color: #4A4A4A; font-family: Lato, Arial, sans-serif;">${row.newSnow}</td>
    <td style="padding: 12px 0 6px 0; font-size: 16px; font-weight: 300; color: #4A4A4A; font-family: Lato, Arial, sans-serif;">${row.snowDepth}</td>
    <td style="padding: 12px 0 6px 0; text-align:right;">
      <img style="width: 22px" src=${row.weatherIconUrl} />
    </td>
  </tr>
`).join('');

const generateBody = (resortRows) => `
<mj-section background-color="#FFF" background-repeat="repeat" padding="0px 0 40px 0" text-align="center" vertical-align="top">

  <mj-column width="100%">
    <mj-table padding="0 12px 0 12px">
      <tr style="text-align:left; padding:0 0 0 0;">
        <th style="padding: 0 0 0 0;"></th>
        <th style="padding: 0 0 0 0;"></th>
        <th style="padding: 0 0 0 0; font-size: 12px; font-weight: 400; color: #9B9B9B; font-family: Lato, Arial, sans-serif;">NEW</th>
        <th style="padding: 0 0 0 0; font-size: 12px; font-weight: 400; color: #9B9B9B; font-family: Lato, Arial, sans-serif;">DEPTH</th>
        <th style="padding: 0 0 0 0;"></th>
      </tr>

      ${generateRows(resortRows)}

    </mj-table>
  </mj-column>

</mj-section>
`;

export default (subject, headerAccentColor = '#1ED2FF', dateTime = 'Today 1:00 PM', resortRows = []) => `
<mjml>
  <mj-head>
    <mj-title>{subject}</mj-title>
    <mj-font name="Lato" href="https://fonts.googleapis.com/css?family=Lato:300,400"/>
  </mj-head>
  <mj-body>
    <mj-container>

      <mj-section padding="0">
        <mj-column width="100%">
          <mj-divider width="100%" padding="0" border-color="${headerAccentColor}"></mj-divider>
        </mj-column>
      </mj-section>

      ${generateHeader(dateTime)}
      ${generateBody(resortRows)}
      ${generateFooter()}

    </mj-container>
  </mj-body>
</mjml>
`;
