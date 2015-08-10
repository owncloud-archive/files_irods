<?php

OCP\JSON::checkLoggedIn();
OCP\JSON::callCheck();
OCP\JSON::checkAppEnabled('files_irods');

$source = $_POST['source'];

if (isset($_POST['delete'])) {
  $f = \OC\Files\Filesystem::fopen("$source?id=${_POST['pk']}", 'm-');
  if ($f == false) {
    \OCP\JSON::error();
  } else {
    \OCP\JSON::success();
  }
  return;
}

$f = \OC\Files\Filesystem::fopen("$source?name=${_POST['name']}&value=${_POST['value']}&id=${_POST['pk']}", 'm');
$meta = stream_get_meta_data($f)['wrapper_data']->metadata;

$newId = 0;
foreach ($meta as $m) {
  if ($m->id > $newId) {
    $newId = $m->id;
  }
}

if ($f == false) {
  \OCP\JSON::error();
} else {
  \OCP\JSON::success(array("oldId"=>$_POST['pk'], "newId"=>$newId));
}

?>