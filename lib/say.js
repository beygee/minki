const commander = require("./commander");
const term = require("terminal-kit").terminal;

//---------------- scripts-------------------
var scripts = new Array();
scripts.push("You can never replace anyone because everyone is made up of such beautiful");
scripts.push("Hello, Boy.");
scripts.push("You are my Everything.");
scripts.push("Go to the Blue.");
scripts.push("I can Shoot!!!!");
scripts.push("Stop 90 Thousand!");
scripts.push("You either die a hero or you live long enough to see yourself become the villain. - Harvey Dent");
scripts.push("kui Chan A");
scripts.push("MINKI ZZANG");
scripts.push("I like Apple.");
scripts.push("GRRRRRRRRRRRRR");
scripts.push("MUNG MUNG!!!!");
scripts.push("Tyler Durden : It's only after we've lost everything that we're free to do anything. - Fight Club");
scripts.push("Greta : You know, I wasn't trying to win you over. I was telling you to fuck off.  - Begin Again");
//-------------------------------------------


ran = Math.random();
index = parseInt(ran * scripts.length);

commander.command("say").action(() => {
  term.slowTyping(
    scripts[index],
    { flashStyle: term.brightWhite,
      delay: 50 } ,
    function() { process.exit() ; }
  ) ;
});
