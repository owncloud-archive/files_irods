<?php

OCP\JSON::checkLoggedIn();
OCP\JSON::callCheck();
OCP\JSON::checkAppEnabled('files_irods');

$source = $_GET['source'];

$f = \OC\Files\Filesystem::fopen($source, 'r');
$meta = stream_get_meta_data($f)['wrapper_data']->metadata;

$html = "<table id='metadata'>
           <thead>
             <tr>
               <th>Key</th>
               <th>Value</th>
               <th>Units</th>
             </tr>
           </thead>
           <tbody>";
foreach ($meta as $m) {
  $html .= sprintf("<tr><td>%s</td><td>%s</td><td>%s</td></tr>", $m->name, $m->value, $m->units);
}
$html .= "</tbody></table>";

\OCP\JSON::success(array('data' => $html));

?>