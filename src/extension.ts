import * as vscode from 'vscode';

let xp = 0;
let interval: any;
let idleTimer: any;
let lastQuoteTime = 0;
// Ranks
const ranks = [
	"Bronze I", "Bronze II", "Bronze III",
	"Silver I", "Silver II", "Silver III",
	"Gold I", "Gold II", "Gold III",
	"Platinum I", "Platinum II", "Platinum III",
	"Diamond I", "Diamond II", "Diamond III",
	"Master I", "Master II", "Master III",
	"Grandmaster I", "Grandmaster II", "Grandmaster III", "Legend"
];

// Motivation Quotes
const motivationQuotes = [
	"Programming is 10% writing code and understanding why it's not working is 90%. 🧠",
	"The best error message is the one that never shows up. ✨",
	"Stay humble, stay hungry, and keep coding. 🔥",
	"A language that dosen't affect the way you think about programming is not worth knowing. 💭",
	"Software is a gas; it expands to fill its container - Nathan Myhrvold. 🎈",
	"Success is a collection of solved bugs. 💪",
	"The expert in anything was once a beginner. 🌱",
	"Write code as if the person who ends up maintaining it is a violent psychopath who knows where you live - John Woods. 🔪",
	"Code never lies, comments sometimes do - Ron Jeffries. 🙊",
	"There are only two hard things in Computer Science: cache invalidation and naming things - Phill Karlton. 🏷️",
	"Before software can be reusable it first has to be usable - Ralph Johnson. 🛠️",
	"Computers are fast; programmers are the bottleneck. 🐢",
	"The only code that has no bugs is the code you haven't written yet. 🚫",
	"Code is where logic meets magic. 🪄",
	"You are not your code. Don't take bugs personally. ❤️",
	"Good code is its own best documentation. 📖",
	"The best way to learn is to build something that breaks. 🔨",
	"Don't stop when you're tired. Stop when the feature is shipped. 🚢",
	"Programming is the closest thing we have to magic spells. 🧙‍♂️",
	"In a world of variables, be a constant. 💎",
	"Simplicity is the ultimate sophistication - Leonardo da Vinci. 🎨",
	"Measuring programming progress by lines of code is like measuring aircraft building progress by weight - Bill Gates. ✈️",
	"Programming isn't about what you know; it's about what you can figure out - Chris Pine. 🔍",
	"Code is like humor. When you have to explain it, its bad - Cory House. 🤡",
	"Programming is not just about writing code, it's about solving problems and creating solutions. 🧩",
	"The best programmers are not marginally better than merely good ones. They are an order-of-magnitude better - Randall E. Stross. 🚀",
	"Clean code always looks like it was written by someone who cares - Robert C. Martin. 🧼",
	"Control complexity or it will control you. 🕹️",
	"Copy and paste is a design error - Dvid Parnas. ✂️",
	"The computer is incredibly fast, accurate, and stupid. Man is incredibly slow, inaccurate, and brilliant - Leo Cherne. 🧠",
	"Every line of code you don't write is a line you don't have to debug. 📉",
	"If it's worth building, it's worth building right. 🏗️",
	"A good programmer is someone who always looks both ways before crossing a one-way street - Doug Linder. 🚦",
	"Quality is not an act, it is a habit. 🎖️",
	"Don't reinvent the wheel, just realign it. 🎡",
	"The goal is to write code that even a non-coder could almost understand. 🗣️",
	"Elegant code is the silence between the notes. 🎼",
	"Structure follows stratergy. 🗺️",
	"Red, Greeen, Refactor. Repeat. 🔁",
	"Optimization is the root of all evil if done too early. 👿",
	"Think twice, code once. 🤔",
	"A user interface is like a joke. If you have to explain it, its not that good. 🎭",
	"Modularize your thoughts before you modularize your code. 📦",
	"Abstraction is the key to managing chaos. 🌪️",
	"It works on my machine, (The lie every coder tells). 🤥",
	"Sometimes the best debugger is a good night's sleep. 😴",
	"A problem well-stated is a problem half-solved - Charles Kettering. ✅",
	"The most important tool in a hacker's toolkit is curiosity. 🕵️",
	"Deleted code is debugged code - Jeff Sickel. 🗑️",
	"Don't just fix the bug. Understand why it existed. 💡",
	"Binary is as simple as 01,10,11. 🔢",
	"Your code is a reflection of your mindset. 🪞",
	"If at first you don't succeed; call it version 1.0. 🏷️",
	"Errors are just proof that you are trying. 💯",
	"Rubber ducking: Explain it to the duck until the duck explains it to you. 🦆",
	"The bug you find today is the lesson you keep forever. 🎓",
	"Code is like a bank account; if you take out too much (Technical Debt), you go bankrupt. 🏦",
	"Focus on the logic, the syntax will follow. 🎯",
	"There is no 'ctrl-z' in life, but there is in GitHuhb. 🐙",
	"Hard work beats talent when talent dosen't write documentation. ✍️",
	"Everything is impossible until someone writes a library for it. 📚",
	"The more you sweat in development, the less you bleed in production. 🛡️",
	"Challenge the code, not the person who wrote it. 🤝",
	"Debugging is like being the detective in a movie where you area also the murderer. 🕵️‍♀️",
	"The best way to get a project done is to start. 🏁",
	"Innovation distinguishes between a leader and a follower - Steve Jobs. 💡",
	"Technology is best when it brings people together. 🤝",
	"Don't just use technology, build it. 🛠️",
	"The keyboard is mightier than the sword. ⌨️",
	"Code is the language of the mordern world. 🌍",
	"Every great app started with a single line of code. ☝️",
	"Be the developer you wanted to work with when you started. 🌟",
	"Small commits lead to big changes. 📈",
	"Automation is the key to freedom. 🤖",
	"Software is eating the world - Marc Andreessen. 🍽️",
	"The most dangerous thought a coder can have is 'good enough'. ⚠️",
	"Push yourself, because no one else is going to do it for you. ⚡",
	"Dream in code, live in reality. 💤",
	"The code you write today defines the user's experience tomorrow. 🌅",
	"Stay Curious. Every 'why' leads to a better 'how'. ❓",
	"Great things never come from comfort zones. 🏔️",
	"Your legacy is the code that outlasts your tenure. 🏛️",
	"Coding is a superpower. Use it wisely. 🦸",
	"The limit is not the hardware; it's your imagination. 🌌",
	"Keep it simple, stupid (KISS). 💋",
	"Breaks are part of the process, not a distraction from it. 🚶",
	"A calm mind writes clean logic. 🧘",
	"Consistency > Intensity. 📈",
	"Learning to code is a marathon, not a sprint. 🏃",
	"You don't have to know everything; you just have to know how to find it. 🔍",
	"Coffee: the fuel for the logical engine. ☕",
	"Respect the semicolon. 📉",
	"Work smarter, not just harder. 🧠",
	"Your health is your most important hardware. 🍏",
	"The best code is no code at all. 💨",
	"Simplify until you can't remove anything else. ✂️",
	"Practice makes permanent. 🏫",
	"Don't be afraid to delete your darlings (bad code). 💔",
	"Celebrate every successful build, no matter how small. 🥂",
	"One cup of coffee, ten lines of genius. ☕",
	"Flow state is the developer's natural habitat. 🌊",
	"Focus on progress, not perfection. 🎯",
	"The joy of coding is the joy of discovery. 🤩",
	"Keep Shipping. 📦",
	"I just Checked your PR. It looks Great. Merging now. ✅",
	"Push yourself, because no one else will. 🤜",
	"Consistency beats motivation. 🧱",
	"Small progress is still progress. 🐢",
	"You are closer than you think. 🏁",
	"Code. Debug. Repeat. 🔁",
	"Stay focused. Stay sharp. 🗡️",
	"Discipline > Motivation. 🎖️",
	"Great things take time. ⏳",
	"Don't stop until you're proud. 🏅",
	"Every line of code matters. 🖋️"
];

// Roast Quotes
const roastQuotes = [
	"Bro, are you waiting for the code to write itself, or are you in a committed relationship with that cursor? 🖱️",
	"Your IDE called. It's Filing for abandonment. 📞",
	"At this speed, you're not a developer, you're a professional screen-saver. 🖥️",
	"Is that a 'Loading' icon in your eyes, or are you actually thinking? 🙄",
	"Your contribution graph is looking like a desert. Where's the green, man? 🌵",
	"CPU usage: 1%. Brain usage: 0%. Deadline: 100%. 📊",
	"Are you waiting for a sign from God, or just a Stack Overflow miracle? 🙏",
	"I've seen glaciers move faster than your progress bar today. 🧊",
	"Stop staring at the code. It's not a magic eye poster; the solution isn't going to pop out. 👁️",
	"You've spent more time picking a VS Code theme than actually writing functions. 🎨",
	"Your keyboard is basically a fidget spinner at this point. ⌨️",
	"Are you on a lunch break, or is this just your 'natural' coding pace? 🍔",
	"If laziness was a programming language, you'd be Senior Architent. 👑",
	"Bro, even Internet Explorer would have finished this task by now. 🐌",
	"I checked the logs. The only thing 'active' in this room is your breathing. 🌬️",
	"Are you a while(true) loop? Because you're doung a lot of nothing and never stopping. 🔄",
	"Your code has fewer lines than your forehead right now. Start typing. 👴",
	"If I wanted to see someone do nothing, I'd watch a loading screen. At least that has a percentage. ⏳",
	"Bro's brain is currently in sleep() mode. Someone send an interrupt signal. 😴",
	"You're treating that 'Enter' key like it's a sacred relic. Just press it. ⛩️",
	"GitHub is crying. 😭",
	"Status: Idle. Salary: Pending. 💸",
	"Nice Wallpaper. Now close it! 🖼️",
	"Your RAM is wasted on you. 🐏",
	"Are you a developer or a spectator? 🎟️",
	"The code isn't shy. You can touch the keys. 🙈",
	"Don't worry, the bugs are growing while you're resting. 🐜",
	"Error 404: Motivation Not Found. 🚫",
	"You're one 'Alt-Tab' away from a performance review. 📑",
	"Type something. Anything. Even a comment. 📝",
	"Are you writing a script or just waiting for your destiny to arrive? 🔮",
	"Taking this long for a semicolon? Are you waiting for an auspicious wedding date to finish the line? 💍",
	"Bro, start coding; daydreaming dosen't get you jobs on Linkedin. 💼",
	"Your laptop is overheating just from watching your cold productivity. 💻",
	"Refreshing the page doesn't change the code; typing does. 🔄",
	"Your keyboard is gathering dust; maybe try runnung a'clear' command for once. 🧹",
	"Bro, have you already started practicing your 'I'm sorry' speech for the client? 🙇‍♂️",
	"Drinking tea builds logic; just holding the cup does nothing. ☕",
	"Is the system frozen, or is it just your brain? ❄️",
	"The deadlines are getting closer, and you're still lost in space. Move! 🚀",
	"Your code history has more 'Initial Commits' than actual finished projects. Finish One! 🚩",
	"Are you waiting for the compiler to give you permission to start? 🤖",
	"I've seen hello_world.py take more effort than what you're doing right now. 👶",
	"You're not 'thinking,' you're just staring at a syntax error and hoping it goes away. 😑",
	"If we paid you per line of code written today, you'd owe us money. 💵",
	"Is your spacebar broken, or are you just allergic to progress? 🤧",
	"At this rate, your AI replacement will be retired before you finifh this sprint. 👵",
	"You have 47 tabs open and not a single line of code to show for it. Immpressive. 🤯",
	"Your Keyboard has RGB lighting just so you can see exactly where you aren't typing. 🌈",
	"Are you a Senior Developer or just a Senior Procrastinator? 🛌"
];

// Smart Dev Quotes
const devQuotes = [
    "An error is just your code asking for a better version of you 💎",
    "Red text in the console is just the heat needed to forge a better dev 🔥",
    "A bug found is a lesson learned; a bug ignored is a debt earned 🛡️",
    "The more 'Undefined' you see, the more 'Defined' your skills become 🧠",
    "Every 'Refused to Connect' is an opportunity to master the network 🌐",
    "Syntax errors are just typos on the path to a masterpiece ✍️",
    "A coder who never fails is a coder who never scales 🚀",
    "Don't fear the stack trace—it's the GPS to your solution 🗺️",
    "Compilation failed? That's just the machine keeping you sharp ⚔️",
    "Bugs are the currency we pay for high-level expertise 💸",
    "If it didn't break, you wouldn't know how it actually works 🛠️",
    "The debugger isn't a judge; it's a mentor in disguise 🎓",
    "Every 'Illegal Argument' makes you a better lawyer for your logic ⚖️",
    "A crashed server is just a chance to build a stronger foundation 🏗️",
    "Don't take errors personally; the compiler doesn't have feelings, only rules 🤖",
    "The 'Aha!' moment is worth every 'Oh No' moment that preceded it ✨",
    "Every console error is a 'Level Up' notification in real life 🎮",
    "You aren't stuck; you are currently downloading a new skill ⏳",
    "The best logic is born from the ashes of a failed build 🦅",
    "A messy stack trace is just a puzzle waiting for a genius solve 🧩",
    "Errors are the breadcrumbs leading you to the heart of the system 🍞",
    "If you want to be a Senior, you have to survive the Junior errors 🥇",
    "Every 'Null Pointer' is a reminder to point your logic in the right direction 📍",
    "The compiler is the only friend that tells you the truth to your face 🤝",
    "Failure is just a function that returns the data you need to succeed 📊",
    "Don't delete the project; just refactor your patience 🧘",
    "The frustration you feel is your brain literally expanding 🧠⚡",
    "Code, Break, Fix, Repeat—that’s the rhythm of a master 🔁",
    "An error-free first run is suspicious; a debugged run is solid 🧱",
    "The bug isn't an obstacle; the bug is the teacher 🏫",
    "Your worth isn't measured by how few bugs you have, but by how many you fix 🏆",
    "A 'Time Out' error is just a sign to take a breath and try a new angle 🌬️",
    "Every 'Internal Server Error' builds internal character 🛡️",
    "Log your errors, but live for the solutions 📝",
    "The most complex bugs provide the most satisfying 'Git Commits' ✅",
    "You haven't failed; you've just discovered another way the logic didn't work 💡",
    "The 'Red' in your console is the 'Green' in your future career 📈",
    "A 'Memory Leak' is just a reminder to stay mindful of the details 🧠",
    "Every 'Merge Conflict' is a lesson in collaboration and clarity 🤝",
    "Keep pushing—the solution is usually hiding behind the next error message 🏁"
];

export function activate(context: vscode.ExtensionContext) {

	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 9999);
	statusBar.show();

	function updateStatus() {
		const rankIndex = Math.floor(xp / 5);
		const rank = ranks[Math.min(rankIndex, ranks.length - 1)];
		statusBar.text = `🔥 XP: ${xp} | ${rank}`;
	}

	function addXP() {
		xp += 1;
		updateStatus();
		vscode.window.showInformationMessage("XP +1 🔥 Keep going!");
	}

	function random(arr: string[]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function showMotivation() {
		vscode.window.showInformationMessage(random(motivationQuotes));
	}

	function showRoast() {
		vscode.window.showWarningMessage(random(roastQuotes));
	}

	// ✅ 3 MIN COOLDOWN FIX
	function showDevQuote() {
		const now = Date.now();

		if (now - lastQuoteTime < 180000) { // 3 min
			return;
		}

		lastQuoteTime = now;
		vscode.window.showInformationMessage(random(devQuotes));
	}

	// 🔥 instant XP (UX better)
	addXP();

	// ⏱️ XP every 10 minutes (REAL VALUE)
	interval = setInterval(() => {
		addXP();
		showMotivation();
	}, 600000);

	// 😏 Idle detection (5 min)
	function resetIdleTimer() {
		if (idleTimer) clearTimeout(idleTimer);

		idleTimer = setTimeout(() => {
			showRoast();
		}, 300000);
	}

	vscode.workspace.onDidChangeTextDocument(() => {
		resetIdleTimer();
	});

	vscode.workspace.onDidSaveTextDocument(() => {
		showDevQuote();
	});

	updateStatus();
	resetIdleTimer();

	context.subscriptions.push(statusBar);
}