function noenter()
{
  return !(window.event && window.event.keyCode == 13);
}

function clr(nm)
{
  if(nm=='all') nm=['tableF','dispF','opF']
  else nm=new Array(nm)
  console.log(nm)
  for(i of nm)
  {
    console.log(i)
    document.getElementById(i).reset();
  }
}

function toggle(hd,sh)
{
  document.getElementById(hd).style.display="none"
  document.getElementById(sh).style.display="block"
}

function tableInput(edit)
{
  if(edit)
  {
    toggle('disp','table')
    return
  }
  toggle('desc','table')
  tape=document.getElementById("tp").value.split(',')
  blank=document.getElementById("bk").value
  if(blank.length<1) blank=" "
  tape.push(blank)
  console.log(tape)
  states=document.getElementById("st").value
  frmt=document.getElementById("frmt").value
  console.log(frmt)
  x="<tr>"
  for(i=-1;i<tape.length;i++)
  {
    if(i==-1) ch=" "; else ch=tape[i];
    x+="<th>"+ch+"</th>"
  }
  x+="</tr>"

  for(i=0;i<states;i++)
  {
    x+="<tr><td><input id=\"st"+i+"\" onkeypress=\"return noenter()\" type=\"text\" autocomplete=\"off\" placeholder=\"State\"></td>"
    for(j=0;j<tape.length;j++)
    {
      x+="<td><input id=\"fn"+i+"_"+j+"\" onkeypress=\"return noenter()\" type=\"text\" autocomplete=\"off\" placeholder=\"Function\"></td>"
    }
    x+="</tr>"
  }
  document.getElementById("t_ip").innerHTML= x;
}

function fn(f)
{
  if(f.length<2)
    return " "
  else
    return "( "+f+" )"
}

function stt(s)
{
  x=""+s
  if(s==fnl)  x="<b>(</b> "+x+" <b>)</b>"
  if(s==inl)  x="<b>&rarr;</b> "+x
  return x
}

function tableOutput()
{
  if(!createDict()) return
  toggle('table','disp')
  x="<tr align=\"center\">"
  for(i=-1;i<tape.length;i++)
  {
    if(i==-1) ch=" "; else ch=tape[i];
    x+="<th class=\"pad\">"+ch+"</th>"
  }
  x+="</tr>"
  for(i in tb)
  {
    x+="<tr><td align=\"left\" class=\"pad\">"+stt(i)+"</td>"
    for(j=0;j<tape.length;j++)
      x+="<td class=\"pad\">"+fn(tb[i][tape[j]])+"</td>"
    x+="</tr>"
  }
  document.getElementById("t_op").innerHTML= x;
}
