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
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>";
foreach ($meta as $m) {
  $html .= sprintf("<tr><td class='editable' data-name='name' data-pk=$m->id>%s</td>
                    <td class='editable' data-name='value' data-pk=$m->id>%s</td>
                    <td class='editable' data-name='units' data-pk=$m->id>%s</td>
                    <td><button class='btn btn-danger remove-metadata' data-pk=$m->id><i class='glyphicon glyphicon-remove'></i> Remove</button></td>
                    </tr>", $m->name, $m->value, $m->units);
}
$html .= "</tbody></table>";

\OCP\JSON::success(array('data' => $html));

?>