<?php
$this->create('files_irods_ajax_getMeta', 'ajax/getMeta.php')
	->actionInclude('files_irods/ajax/getMeta.php');
$this->create('files_irods_ajax_setMeta', 'ajax/setMeta.php')
	->actionInclude('files_irods/ajax/setMeta.php');