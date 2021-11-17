tape=null; blank=null; states=null; frmt=null;
inl=null; fnl=null;
tb={}; keys=null;

function check()
{
  keys=[]
  for(i in tb)  keys.push(i)
  //console.log(keys)

  for(i in tb)
  {
    for(j=0;j<tape.length;j++)
    {
      t=tb[i][tape[j]].split(',')
      if(t[0]=='') continue
      if(t.length<3)  return false
      if(!tape.includes(t[frmt.indexOf('x')]) )  return false
      if(!keys.includes(t[frmt.indexOf('s')]) )  return false
      if('RrLl'.indexOf(t[frmt.indexOf('d')])<0 ) return false
    }
  }
  return true
}

function createDict()
{
  tb={}
  for(i=0;i<states;i++)
  {
    temp={}
    for(j=0;j<tape.length;j++)
      temp[tape[j]]=document.getElementById("fn"+i+"_"+j).value
    k=document.getElementById("st"+i).value
    if(k.length<1) { alert("Please Enter all States"); return false; }
    tb[k]=temp
  }
  inl=document.getElementById("inl").value
  if(inl.length<1) { alert("Please Enter Initial State"); return false; }
  fnl=document.getElementById("fnl").value
  if(fnl.length<1) { alert("Please Enter Final State"); return false; }
  //console.log(inl+" "+fnl)
  c=0
  for(i in tb)
  {
    if(i==inl)  c++
    if(i==fnl)  c++
  }
  if(c!=2)  { alert("Initial/Final State not found"); return false; }
  if(!check())  {alert("Check the values again and re-enter"); return false;}
  return true
}

function dirc(d)
{
  //console.log(d)
  if('Rr'.indexOf(d)>=0)
    head+=1;
  else if('Ll'.indexOf(d)>=0)
    head-=1;
  else
    throw new Error("Wrong Direction")

  if(head<0)
  { w=blank+w; head=0;}
  else if(head>=w.length)
    w+=blank
}

function endl()
{
  s=" <span style=\"white-space: nowrap;\">|<font size=\"3\" color=\"blue\">( "
  s+=rd.join()
  s+=" )</font>&ndash;</span> "
  return s
}

function validate()
{
  document.getElementById("res").innerHTML="";
  w=document.getElementById('ck').value
  for(i of w)
    if(!tape.includes(i))
    {
      alert("Enter String with correct tape symbols");
      return
    }

  toggle('disp','op');
  head=0
  x="<h3>Transitions:-</h3>"
  st=inl
   while(true)
   {
     rd=tb[st][w[head]].split(',')
     //console.log(rd)
     if (rd.length<3)
     {
       x+="<span style=\"white-space: nowrap;\"><b>"+w.slice(0,head)+"</b><font size=\"4\" color=\"red\">"+st+"</font><b>"+w.slice(head)+"</span></b><br>"
       x+="<p>Output: <b>"+w+"</b></p>"
       x+="<p>End State: <b>"+st+"</b></p>"
       x+="<p>Final Head Position: <b>"+head+"</b></p>"
       break
     }
     x+="<span style=\"white-space: nowrap;\"><b>"+w.slice(0,head)+"</b><font size=\"4\" color=\"red\">"+st+"</font><b>"+w.slice(head)+"</span></b>"+endl()
     w=w.slice(0,head)+rd[frmt.indexOf('x')]+w.slice(head+1)
     st=rd[frmt.indexOf('s')]
     dirc(rd[frmt.indexOf('d')])
   }
   x+="<p>Status: <b>"
   if(st==fnl)  x+="Valid"
   else x+="Invalid"
   x+=" String</b></p>"
   document.getElementById("res").innerHTML= x;
}
