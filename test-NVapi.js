var soap = require('strong-soap').soap;
// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
var url = 'http://dataexchange.511nv.com/data/DataExchange?wsdl';



var options = {};



soap.createClient(url, options, function(err, client) {

  // client.setSecurity(new soap.BasicAuthSecurity('juliaqiuxy', '092800yu'));

  var wsSecurity = new soap.WSSecurity('Juliaqiuxy', '092800yu')
    //the 'options' object is optional and contains properties:
    //passwordType: 'PasswordDigest' or 'PasswordText' default is PasswordText
    //hasTimeStamp: true or false, default is true
    //hasTokenCreated: true or false, default is true
  client.setSecurity(wsSecurity);

 // console.log(err, client);


  var method = client['getData'];



  var requestArgs = {
  };

  method(requestArgs, function(err, result, envelope, soapHeader) {

    console.log(err)
    //response envelope
    // console.log('Response Envelope: \n' + envelope);
    //'result' is the response body
    // console.log('Result: \n' + JSON.stringify(result));
  }, null, {
    Security: 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd',
  });
});
