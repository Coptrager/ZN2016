function startListeners()
{
	terminal.OnResponse = OnResponse;
}

function log (value)
{
	alert(value);
}

function OnResponse(sName, sVal)
{
	if(mov != null)
	{
		mov.fromMaratl(sName, sVal);
	}
}
    
function toMaratl(code, value)
{
	terminal.ProcessCommand(code, value);
}