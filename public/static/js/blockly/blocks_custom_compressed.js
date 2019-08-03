function checkNumeric(t){return(t=t.replace(",",".")).match(/^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/g)?t:null}Blockly.Blocks.block_alter={init:function(){this.appendValueInput("TABLE").setCheck("table").appendField("ALTER TABLE"),this.appendStatementInput("MODIFIER").setCheck("altermodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER),this.setHelpUrl("")}},Blockly.Blocks.alter_rename_to={init:function(){this.appendValueInput("NEWNAME").setCheck("string").appendField("RENAME TO"),this.setPreviousStatement(!0,"altermodifier"),this.setNextStatement(!0,"altermodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_RENAME),this.setHelpUrl("")}},Blockly.Blocks.alter_rename_column={init:function(){this.appendValueInput("COLUMN").setCheck("column").appendField("RENAME COLUMN"),this.appendValueInput("NEWNAME").setCheck("string").setAlign(Blockly.ALIGN_RIGHT).appendField("TO"),this.setInputsInline(!1),this.setPreviousStatement(!0,"altermodifier"),this.setNextStatement(!0,"altermodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_RENAME_COLUMN),this.setHelpUrl("")}},Blockly.Blocks.alter_add_column={init:function(){this.appendStatementInput("COLUMNDEFINITION").setCheck("columndefinition").appendField("ADD COLUMN"),this.setInputsInline(!1),this.setPreviousStatement(!0,"altermodifier"),this.setNextStatement(!0,"altermodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_ADD_COLUMN),this.setHelpUrl("")}},Blockly.Blocks.block_create={init:function(){this.appendValueInput("TABLE").setCheck("string").appendField("CREATE TABLE"),this.appendStatementInput("COLUMNDEFINITION").setCheck("columndefinition"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_CREATE),this.setHelpUrl("")}},Blockly.Blocks.block_drop={init:function(){this.appendValueInput("TABLE").setCheck("table").appendField("DROP TABLE"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_DROP),this.setHelpUrl("")}},Blockly.Blocks.block_insert={init:function(){this.appendValueInput("TABLE").setCheck("table").appendField("INSERT INTO"),this.appendStatementInput("COLUMN").setCheck("column"),this.appendStatementInput("VALUE").setCheck("value").appendField("VALUES"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_INSERT),this.setHelpUrl("")}},Blockly.Blocks.block_select={init:function(){this.appendStatementInput("COLUMN").setCheck("column").appendField("SELECT"),this.appendStatementInput("TABLE").setCheck("table").appendField("FROM"),this.appendStatementInput("MODIFIER").setCheck("selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT),this.setHelpUrl("")}},Blockly.Blocks.block_subselect={init:function(){this.appendStatementInput("COLUMN").setCheck("column").appendField("SELECT"),this.appendStatementInput("TABLE").setCheck("table").appendField("FROM"),this.appendStatementInput("MODIFIER").setCheck("selectmodifier"),this.setPreviousStatement(!0,"subselect"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT),this.setHelpUrl("")}},Blockly.Blocks.select_join={init:function(){this.appendValueInput("TABLE").setCheck("table").appendField(new Blockly.FieldDropdown([["NATURAL","NATURAL"],["LEFT","LEFT"],["LEFT OUTER","LEFT OUTER"],["INNER","INNER"]]),"jointype").appendField("JOIN"),this.appendStatementInput("CONDITION").setCheck("conditionstart").setAlign(Blockly.ALIGN_RIGHT).appendField("ON"),this.setPreviousStatement(!0,"selectmodifier"),this.setNextStatement(!0,"selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_JOIN),this.setHelpUrl("")}},Blockly.Blocks.select_where={init:function(){this.appendStatementInput("CONDITION").setCheck("conditionstart").appendField("WHERE"),this.setPreviousStatement(!0,"selectmodifier"),this.setNextStatement(!0,"selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_WHERE),this.setHelpUrl("")}},Blockly.Blocks.select_group={init:function(){this.appendStatementInput("COLUMN").setCheck("column").appendField("GROUP BY"),this.appendStatementInput("MODIFIER").setCheck("selectgroupmodifier"),this.setPreviousStatement(!0,"selectmodifier"),this.setNextStatement(!0,"selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_GROUP),this.setHelpUrl("")}},Blockly.Blocks.select_group_having={init:function(){this.appendStatementInput("CONDITION").setCheck("conditionstart").appendField("HAVING"),this.setPreviousStatement(!0,"selectgroupmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_GROUP_HAVING),this.setHelpUrl("")}},Blockly.Blocks.select_order={init:function(){this.appendStatementInput("COLUMN").setCheck("column").appendField("ORDER BY"),this.setPreviousStatement(!0,"selectmodifier"),this.setNextStatement(!0,"selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_ORDER),this.setHelpUrl("")}},Blockly.Blocks.select_limit={init:function(){this.appendDummyInput().appendField("LIMIT").appendField(new Blockly.FieldNumber(1,0,1/0,1),"limit"),this.setPreviousStatement(!0,"selectmodifier"),this.setNextStatement(!0,"selectmodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_LIMIT),this.setHelpUrl("")}},Blockly.Blocks.block_update={init:function(){this.appendValueInput("TABLE").setCheck("table").appendField("UPDATE"),this.appendStatementInput("ALLOCATIONS").setCheck("columntovalue").appendField("SET"),this.appendStatementInput("MODIFIER").setCheck("updatemodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE),this.setHelpUrl("")}},Blockly.Blocks.update_where={init:function(){this.appendStatementInput("CONDITION").setCheck("conditionstart").appendField("WHERE"),this.setPreviousStatement(!0,"updatemodifier"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE_WHERE),this.setHelpUrl("")}},Blockly.Blocks.columntovalue={init:function(){this.appendValueInput("COLUMN").setCheck("column"),this.appendDummyInput().appendField("="),this.appendValueInput("VALUE").setCheck("value"),this.setPreviousStatement(!0,"columntovalue"),this.setNextStatement(!0,"columntovalue"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE_COLUMNTOVALUE),this.setHelpUrl("")}},Blockly.Blocks.columndefinition={init:function(){this.appendDummyInput("COLUMN").appendField("Columnname:").appendField(new Blockly.FieldTextInput("columnname"),"NAME"),this.appendDummyInput("TYPE").appendField("Columntype:").appendField(new Blockly.FieldDropdown([["TEXT","TEXT"],["NUMERIC","NUMERIC"],["INTEGER","INTEGER"],["REAL","REAL"],["BLOB","BLOB"]]),"TYPE"),this.appendDummyInput(),this.appendDummyInput().setAlign(Blockly.ALIGN_LEFT).appendField("Constraints:"),this.appendDummyInput("PRIMARYKEY").appendField("PRIMARY KEY").appendField(new Blockly.FieldCheckbox("FALSE",function(t){this.sourceBlock_.selectPrimaryKey_(t)}),"primarykey").appendField("AUTOINCREMENT").appendField(new Blockly.FieldCheckbox("FALSE",function(t){this.sourceBlock_.selectAutoincrement_(t)}),"autoincrement"),this.appendDummyInput("NOT NULL").appendField("NOT NULL").appendField(new Blockly.FieldCheckbox("FALSE"),"notnull"),this.appendDummyInput("UNIQUE").appendField("UNIQUE").appendField(new Blockly.FieldCheckbox("FALSE"),"unique"),this.appendValueInput("DEFAULT").setCheck("value").appendField("DEFAULT").appendField(new Blockly.FieldCheckbox("FALSE"),"default"),this.setPreviousStatement(!0,"columndefinition"),this.setNextStatement(!0,"columndefinition"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_COLUMNDEFINITION),this.setHelpUrl("")},selectAutoincrement_:function(t){t&&this.getField("primarykey").setValue(!0)},selectPrimaryKey_:function(t){t||this.getField("autoincrement").setValue(!1)}},Blockly.Blocks.cond_block={init:function(){this.appendValueInput("LEFT").setCheck(["column","value"]),this.appendDummyInput().appendField(new Blockly.FieldDropdown([["=","="],["<>","<>"],[">",">"],["<","<"],[">=",">="],["<=","<="],["LIKE","LIKE"],["IN","IN"]],function(t){this.sourceBlock_.updateSelection_(t)}),"OPERATOR"),this.appendValueInput("RIGHT").setCheck(["column","value"]),this.setInputsInline(!1),this.setPreviousStatement(!0,["conditionstart","and","or","not"]),this.setNextStatement(!0,"condition"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION),this.setHelpUrl("")},updateSelection_:function(t){"LIKE"===t?this.getInput("RIGHT").type!==Blockly.INPUT_VALUE?(this.removeInput("RIGHT"),this.appendValueInput("RIGHT").setCheck("string")):this.getInput("RIGHT").setCheck("string"):"IN"===t?this.getInput("RIGHT").type===Blockly.INPUT_VALUE?(this.removeInput("RIGHT"),this.appendStatementInput("RIGHT").setCheck(["value","subselect"])):this.getInput("RIGHT").setCheck(["value","subselect"]):this.getInput("RIGHT").type!==Blockly.INPUT_VALUE?(this.removeInput("RIGHT"),this.appendValueInput("RIGHT").setCheck(["column","value"])):this.getInput("RIGHT").setCheck(["column","value"])}},Blockly.Blocks.cond_not={init:function(){this.appendDummyInput().appendField("NOT"),this.setPreviousStatement(!0,"conditionstart"),this.setNextStatement(!0,"not"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_NOT),this.setHelpUrl("")}},Blockly.Blocks.cond_or={init:function(){this.appendDummyInput().appendField("OR"),this.setPreviousStatement(!0,"condition"),this.setNextStatement(!0,["conditionstart","or"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_OR),this.setHelpUrl("")}},Blockly.Blocks.cond_and={init:function(){this.appendDummyInput().appendField("AND"),this.setPreviousStatement(!0,"condition"),this.setNextStatement(!0,["conditionstart","and"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_AND),this.setHelpUrl("")}},Blockly.Blocks.data_boolean={init:function(){this.appendDummyInput().appendField(new Blockly.FieldDropdown([["true","TRUE"],["false","FALSE"]]),"BOOLEAN"),this.setOutput(!0,["boolean","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_BOOL),this.setHelpUrl("")}},Blockly.Blocks.data_boolean_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldDropdown([["true","TRUE"],["false","FALSE"]]),"BOOLEAN"),this.setPreviousStatement(!0,["boolean","value"]),this.setNextStatement(!0,["boolean","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_BOOL),this.setHelpUrl("")}},Blockly.Blocks.data_string={init:function(){this.appendDummyInput().appendField(new Blockly.FieldImage("media/quote0.png",15,10,"*")).appendField(new Blockly.FieldTextInput("value"),"STRING").appendField(new Blockly.FieldImage("media/quote1.png",15,10,"*")),this.setOutput(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_STRING),this.setHelpUrl("")}},Blockly.Blocks.data_string_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldImage("media/quote0.png",15,10,"*")).appendField(new Blockly.FieldTextInput("value"),"STRING").appendField(new Blockly.FieldImage("media/quote1.png",15,10,"*")),this.setPreviousStatement(!0,["string","value"]),this.setNextStatement(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_STRING),this.setHelpUrl("")}},Blockly.Blocks.data_number={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("0",checkNumeric),"NUMBER"),this.setOutput(!0,["number","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_NUMBER),this.setHelpUrl("")}},Blockly.Blocks.data_number_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("0",checkNumeric),"NUMBER"),this.setPreviousStatement(!0,["number","value"]),this.setNextStatement(!0,["number","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_NUMBER),this.setHelpUrl("")}},Blockly.Blocks.data_date={init:function(){this.appendDummyInput().appendField(new Blockly.FieldNumber(1,1,31,1),"DAY").appendField(".").appendField(new Blockly.FieldNumber(1,1,12),"MONTH").appendField(".").appendField(new Blockly.FieldNumber(2019,-9999,9999,1),"YEAR"),this.setOutput(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATE),this.setHelpUrl("")}},Blockly.Blocks.data_date_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldNumber(1,1,31,1),"DAY").appendField(".").appendField(new Blockly.FieldNumber(1,1,12),"MONTH").appendField(".").appendField(new Blockly.FieldNumber(2019,-9999,9999,1),"YEAR"),this.setPreviousStatement(!0,["string","value"]),this.setNextStatement(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATE),this.setHelpUrl("")}},Blockly.Blocks.data_datetime={init:function(){this.appendDummyInput().appendField(new Blockly.FieldNumber(1,1,31,1),"DAY").appendField(".").appendField(new Blockly.FieldNumber(1,1,12),"MONTH").appendField(".").appendField(new Blockly.FieldNumber(2019,-9999,9999,1),"YEAR").appendField(" - ").appendField(new Blockly.FieldNumber(1,1,31,1),"HOUR").appendField(":").appendField(new Blockly.FieldNumber(1,1,31,1),"MINUTE"),this.setOutput(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATETIME),this.setHelpUrl("")}},Blockly.Blocks.data_datetime_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldNumber(1,1,31,1),"DAY").appendField(".").appendField(new Blockly.FieldNumber(1,1,12),"MONTH").appendField(".").appendField(new Blockly.FieldNumber(2019,-9999,9999,1),"YEAR").appendField(" - ").appendField(new Blockly.FieldNumber(1,1,31,1),"HOUR").appendField(":").appendField(new Blockly.FieldNumber(1,1,31,1),"MINUTE"),this.setPreviousStatement(!0,["string","value"]),this.setNextStatement(!0,["string","value"]),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATETIME),this.setHelpUrl("")}},Blockly.Blocks.entity_table={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("table"),"table"),this.setOutput(!0,"table"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.ENTITY_TABLE),this.setHelpUrl("")}},Blockly.Blocks.entitiy_column={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("column"),"column"),this.setOutput(!0,"column"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.ENTITY_COLUMN),this.setHelpUrl("")}},Blockly.Blocks.entity_column_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("column"),"column"),this.setPreviousStatement(!0,"column"),this.setNextStatement(!0,"column"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.ENTITY_COLUMN),this.setHelpUrl("")}},Blockly.Blocks.entity_table_statement={init:function(){this.appendDummyInput().appendField(new Blockly.FieldTextInput("table"),"table"),this.setPreviousStatement(!0,"table"),this.setNextStatement(!0,"table"),this.setColour(230),this.setTooltip(Blockly.Msg.Custom.ENTITY_TABLE),this.setHelpUrl("")}};