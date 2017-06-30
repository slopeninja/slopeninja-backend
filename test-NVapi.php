<?php
$wsdlPath="http://dataexchange.511nv.com/data/DataExchange?wsdl";
$ns = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd';

$token = new stdClass;
$token->Username = new SOAPVar('Juliaqiuxy', XSD_STRING, null, null, null, $ns);
$token->Password = new SOAPVar('092800yu', XSD_STRING, null, null, null, $ns);

$wsec = new stdClass;
$wsec->UsernameToken = new SoapVar($token, SOAP_ENC_OBJECT, null, null, null, $ns);

$headers = new SOAPHeader($ns, 'Security', $wsec, true);

$options = array(
                'exceptions'=>true,
                'trace'=>1
                );

try
{
  $client = new SoapClient($wsdlPath, $options);
  $client->__setSOAPHeaders($headers);
  $response = $client->getPublishTypes();
  print_r($response);
  $response = $client->getData(array('publishType' => 'eventXML'));
  print_r($response);
}
catch (Exception $e)
{
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>
