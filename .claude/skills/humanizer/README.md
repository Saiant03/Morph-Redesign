# Humanizer

> Humanize AI text. Make your prose sound like a human wrote it, not a machine. A Claude Code skill that teaches the feel of real writing, no banned-word list.

While using AI day in and day out for almost everything in the last couple of years, the writing started bothering me in a way I couldn't shake. Every paragraph reads the same. Same hedged framing, same closing line about a bright future, same "on one hand, on the other hand" balance, etc... and once you notice it, you can't read AI text the same way again. It feels boring. It feels assembled. You don't feel like there is a person on the other side of the page.

I tried the humanizer skills that already exist, and honestly, they didn't fix it for me. They all work the same way: a list of banned words, a stack of before-and-after templates, and a hope that the swap-out will make the writing sound human. It doesn't. The AI just dodges the listed words and the prose still reads like an output, because nothing underneath actually changed.

So I built this one, and the approach is different. Instead of giving Claude a list of words to avoid, this skill teaches him what human writing actually feels like, deep enough that he can catch the AI-ness anywhere it shows up. Even in places nobody wrote down in a catalog. The whole thing rests on one idea: human writing trusts the reader, AI writing doesn't.


## Install

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/spuvr/humanizer.git ~/.claude/skills/humanizer
```

That's it. Claude Code picks it up automatically the next time you start a session.

For other tools that read Claude skills (Anti Gravity, OpenCode, and similar agent frameworks), drop the folder into the equivalent skills directory for that tool. The skill is just a SKILL.md file with frontmatter, no platform-specific code, so it travels.


## How to use it

The most basic use is just asking.

```
Humanize this text:
[paste your text]
```

If you want the rewrite to sound like you specifically, pass in a sample of your own writing as a voice reference.

```
Humanize this paragraph. Match the voice of this sample:
[your writing here]

And here is the text to rewrite:
[paste your text]
```

You can drop in pretty much anything: an article draft, a LinkedIn post that came out of ChatGPT, a paragraph in a doc that feels off, an essay, a cover letter, etc... The skill takes over from there.


## What the skill catches, at a glance

A short list of the most common AI patterns the skill recognizes, with what a human writes instead.

| AI writes this | A human writes this |
|---|---|
| "It's worth noting that..." | Cuts it. The sentence already works. |
| "fast, flexible, and reliable" | Lists two or four, not always three. |
| "It's not just X, it's Y" | Just says Y. |
| "Experts say..." | Names the source, or drops the claim. |
| Em-dashes everywhere ("—") | Uses commas, periods, or a plain "-". |
| "stunning, vibrant, breathtaking" | Says what the thing actually is. |
| "Great question!" | Deletes it. The piece starts at sentence one. |
| "The future looks bright" | Ends on something specific instead. |
| "On one hand, on the other hand" | Has an opinion, or admits real uncertainty. |
| "In a world where..." | Starts with the thing itself. |

The full catalog (with more patterns, more examples, and the principles underneath them) lives in [SKILL.md](SKILL.md).


## Before and after, so you can feel the gap

Three before-and-after pairs, each pair written about the same topic with the same factual references. The only thing that changed was whether the humanizer skill was loaded.

**The history of chocolate, without the humanizer skill:**

> Chocolate has a rich and fascinating history that spans thousands of years. The cacao tree, Theobroma cacao, is native to Central and South America, where the Olmecs were likely the first to process cacao beans around 1500 BC. The Mayans and Aztecs later embraced cacao, drinking it as a bitter, frothy beverage and even using the beans as a form of currency. Chocolate made its way to Europe in the 16th century through Spanish conquistadors, where sugar was added to counter its natural bitterness and transform it into a sweet treat. The 19th century brought further innovation with the introduction of solid chocolate bars, and in 1875, Daniel Peter invented milk chocolate in Switzerland, paving the way for the modern confection we enjoy today.

**The history of chocolate, with the humanizer skill:**

> For most of its life, chocolate wasn't sweet. The Olmecs were grinding cacao around 1500 BC, and by the time the Mayans and Aztecs had their hands on it, it was a thick bitter drink they'd whip into foam and pass around at ceremonies. The beans doubled as currency. Spanish conquistadors carried it back across the Atlantic in the 1500s, and someone there had the obvious idea of adding sugar. The bar you eat now is even younger than that. Daniel Peter mixed milk into it in Switzerland in 1875, and that's basically the version that won.

Same facts. The first opens with "Chocolate has a rich and fascinating history" and puts you in textbook mode. The second opens with "For most of its life, chocolate wasn't sweet" and instantly flips an assumption you didn't know you had. You keep reading.

Another one, on how GPS works.

**Without the humanizer skill:**

> GPS, or the Global Positioning System, relies on a network of more than 30 satellites orbiting Earth at an altitude of around 20,200 kilometers. Each satellite continuously broadcasts its position and the precise time, and a GPS receiver on the ground listens to signals from at least four satellites simultaneously. By measuring how long each signal takes to arrive, the receiver calculates its distance to each satellite and uses a process called trilateration to pinpoint its location in three-dimensional space. Originally developed by the US military in the 1970s, GPS was opened to civilian use in the 1980s and made fully accurate for civilians in 2000, becoming an essential part of modern navigation.

**With the humanizer skill:**

> There are about thirty satellites circling the planet at 20,200 km, each one shouting its position and the time, over and over. Your phone listens. It catches signals from at least four of them, works out how long each one took to arrive, and from those four distances it figures out where you're standing in three dimensions. The military built the system in the 1970s and opened it up to civilians a decade later. The signal was still deliberately fuzzy for outsiders until 2000; before then your handheld GPS was off by about a hundred meters because the Pentagon didn't want anyone else's missiles to be accurate.

The baseline gives you the facts in textbook order and closes on "becoming an essential part of modern navigation." The humanizer version says "Your phone listens" in three words, and closes with the real reason civilian GPS used to be inaccurate, which is the kind of detail the baseline didn't reach for even though it had access to the same facts.

One more, on the Wright Brothers' first flight.

**Without the humanizer skill:**

> The Wright Brothers' first powered flight took place on December 17, 1903, at Kitty Hawk, North Carolina, marking a pivotal moment in human history. Wilbur and Orville Wright, bicycle shop owners from Dayton, Ohio, designed and built the Wright Flyer themselves, a biplane equipped with a 40 horsepower engine of their own design. The first flight, with Orville at the controls, lasted just 12 seconds and covered 120 feet, but they made four flights that day, with the longest reaching 59 seconds and 852 feet, piloted by Wilbur. Despite the magnitude of their achievement, news did not spread widely at first, and many people remained skeptical until the brothers gave public demonstrations in 1908.

**With the humanizer skill:**

> Twelve seconds and 120 feet, into the wind off the dunes at Kitty Hawk. That was the first one, December 17, 1903, with Orville at the controls and his brother running alongside. They were bicycle mechanics from Dayton who'd built their own engine because nobody made one light enough. They flew four times that day. Wilbur took the longest, 59 seconds and 852 feet, before the wind picked the Flyer up and broke it on the sand. The story barely traveled at first; most papers didn't believe them until they started flying in public five years later.

The baseline writes "marking a pivotal moment in human history" before it has even shown you what happened. The humanizer version opens with "Twelve seconds and 120 feet, into the wind off the dunes at Kitty Hawk" and you are already standing there. The pivotal-moment line was never necessary, because the facts themselves, given specifically, do the work.


## The benchmark, because I didn't want to just claim it works

I didn't want to just say this skill is good, I wanted to actually test it. So I spawned two Claude agents in parallel in separate terminal windows. One had the humanizer skill loaded, the other didn't. Both got the same four subjects with the same factual references. The only thing that changed was the skill.

The agents wrote their output directly to their own files. I didn't paste anything, edit anything, or pick the good parts. Their raw output is in the [BENCHMARK](BENCHMARK) folder, baseline.md next to humanizer.md, side by side. Compare them and judge for yourself.


## What reading AI feels like versus what reading human writing feels like

Reading AI text feels like reading the same person paraphrasing themselves over and over. The cadence is even, the framing is balanced, the closer is positive in a way that doesn't commit to anything, etc... You read it and you understand it, but nothing in it touches you. It doesn't feel like there is anyone on the other side. It is technically writing, but it does not feel like communication.

Reading human writing feels different in a way that is hard to put into words until you sit with it. There is a person there. They have an opinion. They are a little annoyed, or a little amused, or genuinely uncertain about something, and you can feel it. They reach for specific images and concrete numbers because those are the things they actually know. They leave space in the prose for you to land in your own head. They trust you. You read all the way through, from the first sentence to the last, because each sentence is doing work and pulling you forward instead of restating what came before.

This skill is built to give you back that second kind of reading experience, even when the writer happens to be an AI.


## Why I built this

Honestly, after years of using AI for everything, I just wanted to be able to read what it gives me without zoning out. I wanted to chat with an AI and feel like I'm chatting with a friend, where I actually want to read the whole message from the first sentence to the last, not skim it because it feels generic. That feeling, the feeling that there is somebody on the other end of the words, is what most AI text is missing, and it is what this skill is built to put back.

It is not finished. AI writing is a moving target, and new tells show up as the models change. The pattern catalog inside SKILL.md is a starter, not a closed set. If you find a pattern the skill doesn't catch, open an issue or a pull request, and we will add it. The catalog grows over time. The underlying principle (trust the reader) doesn't change.


## How this skill was written

The skill itself follows the philosophy it teaches. No banned-word list. No find-and-replace templates. No checklist energy. Examples are used as direction, not as a cage. If reading SKILL.md feels like it is hand-holding you, that is a bug, and the file needs another pass.


## License

MIT. Use it however you want, modify it, fork it, ship it inside your own projects, etc... Credit is appreciated but not required.


## Tags

humanize ai text, ai writing humanizer, claude code skill, anthropic skill, remove ai tells, ai writing patterns, make ai sound human, chatgpt humanizer, llm writing style, prose editing, ai content editor, ai text rewriter, humanize chatgpt, natural writing, writing assistant


---

Always appreciated if you wanna sponsor here: [github.com/sponsors/spuvr](https://github.com/sponsors/spuvr)
