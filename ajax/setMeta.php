<?php

OCP\JSON::checkLoggedIn();
OCP\JSON::callCheck();
OCP\JSON::checkAppEnabled('files_irods');

$source = $_POST['source'];

$result = \OC\Files\Filesystem::fopen("$source?name=${_POST['name']}&value=${_POST['value']}&units=${_POST['units']}&id=${_POST['pk']}", 'm');

if ($result == false) {
  \OCP\JSON::error();
} else {
  \OCP\JSON::success();
}

?>