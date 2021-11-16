exp=""; dsp=""; ans=""; f=false; exp2=""; dsp2=""; m=0;
function expr(x)
{
  x=x.trim();
  if(f && x!="<<" && x!=">>")
  {
    exp=""; dsp=""; exp2=""; dsp2="";
    calc.ip.value=dsp;
    f=false;
  }
  switch(x)
  {
    case "M+": res(); m+=ans; break;
    case "M-": res(); m-=ans; break;
    case "MR": exp=""; dsp=""; exp2=""; dsp2=""; ans=m; calc.op.value=ans; break;
    case "MC": exp=""; dsp=""; exp2=""; dsp2=""; m=0; calc.op.value=m; break;
    case "<<": mod(true); moveL(); mod(false); break;
    case ">>": mod(true); moveR(); mod(false); break;
    case 'x': exp+='*'; dsp+=x; break;
    case "Ans": exp+="ans"; dsp+=x; break;
    case "<=": mod(true); exp=exp.slice(0,-1); dsp=dsp.slice(0,-1); mod(false); break;
    case "sin": case "cos": case "tan":
    exp+="Math."+x+"(Math.PI/180*"; dsp+=x+"("; break;
    case "^": exp+="**"; dsp+=x; break;
    case "π": exp+="Math.PI"; dsp+=x; break;
    default: exp+=x; dsp+=x; break;
  }
  calc.ip.value=dsp+dsp2;
}

function mod(k)
{
  if(k)
  {
    if(dsp.indexOf("x^")>-1)  exp=exp.replaceAll("***","*^");
    else if(dsp2.indexOf("x^")>-1)  exp2=exp2.replaceAll("***","*^");
    else if(dsp.indexOf("^x")>-1)  exp=exp.replaceAll("***","^*");
    else if(dsp2.indexOf("^x")>-1)  exp2=exp2.replaceAll("***","^*");
    exp=exp.replaceAll("**","^");   exp2=exp2.replaceAll("**","^");
    exp=exp.replaceAll("Math.","");   exp2=exp2.replaceAll("Math.","");
    exp=exp.replaceAll("PI/180*","");   exp2=exp2.replaceAll("PI/180*","");
    exp=exp.replaceAll("PI","π");   exp2=exp2.replaceAll("PI","π");
  }
  else
  {
    exp=exp.replaceAll("^","**");   exp2=exp2.replaceAll("^","**");
    exp=exp.replaceAll("π","Math.PI");    exp2=exp2.replaceAll("π","Math.PI");
    exp=exp.replaceAll("sin(","Math.sin(Math.PI/180*");   exp2=exp2.replaceAll("sin(","Math.sin(Math.PI/180*");
    exp=exp.replaceAll("cos(","Math.cos(Math.PI/180*");   exp2=exp2.replaceAll("cos(","Math.cos(Math.PI/180*");
    exp=exp.replaceAll("tan(","Math.tan(Math.PI/180*");   exp2=exp2.replaceAll("tan(","Math.tan(Math.PI/180*");
  }
}

function clr()
{
  exp=""; dsp=""; ans=""; exp2=""; dsp2="";
  calc.ip.value=dsp;
  calc.op.value=dsp;
}

function moveL()
{
  if(dsp=="") {f=false; return;}
  if(dsp2=="") {dsp2="_"; f=false; return;}
  exp2=exp[exp.length-1]+exp2.slice(0); exp=exp.slice(0,-1);
  dsp2='_'+dsp[dsp.length-1]+dsp2.slice(1); dsp=dsp.slice(0,-1);
  f=false;
}

function moveR()
{
  if(dsp2=="" || dsp2=="_") {dsp2="_"; f=false; return;}
  exp=exp.slice(0)+exp2[0]; exp2=exp2.slice(1);
  dsp=dsp.slice(0)+dsp2[1]; dsp2='_'+dsp2.slice(2);
  f=false;
}

function res()
{
  //console.log(exp+exp2);
  if(ans=="") ans=0;
  try
  {
    ans=eval((exp+exp2).replaceAll("ans",ans));
    if(ans=="" || ans==undefined) ans=0;
    console.log(exp+exp2+" = "+ans);
    calc.op.value=ans;
    f=true;
    dsp=dsp+dsp2.slice(1); dsp2="";
    exp=exp+exp2; exp2="";
    calc.ip.value=dsp;
  }
  catch(err)
  {
    console.log(err);
    alert("Enter Correctly");
  }
}
