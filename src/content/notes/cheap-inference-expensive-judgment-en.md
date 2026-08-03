---
title: "Cheap Inference, Expensive Judgment"
date: 2026-08-03
lang: "en"
description: "As the cost of inference collapses, value will accumulate not with those who produce cheap inference but with those who rebuild their decisions around it — read through electrification's thirty-year wait."
translationKey: "cheap-inference-expensive-judgment"
draft: false
---

In 1899, electric motors accounted for less than five percent of installed horsepower in American manufacturing. By 1919 the share had reached fifty-five percent. In the twenty years between, nothing much happened to productivity.

The technology was there. Factories had bought it. The results did not come.

## The thesis

The cost of inference — a model producing an output from a new input — will keep collapsing. We see this clearly; the arithmetic is below. But the point that matters is this: **value will accumulate not with those who produce cheap inference, but with those who rebuild their decision-making around it.**

The most valuable companies of the coming years will be the models that reason more accurately by raising the quality of their inference. We extend that: the same holds for the companies using those models. The measure is not "more tokens" but "sounder judgment" — and that is a question of organisation, not a line item on a purchase order.

We care about the distinction because what we look at as investors is not the technology itself, but who will turn it into profit.

## Why the price is falling

Epoch AI tracked, over three years, the price of reaching a given level of performance on six separate benchmarks. The finding: prices fall between 9x and 900x per year, with a median of 50x. The cost of matching GPT-4's performance on PhD-level science questions fell roughly 40x per year. More striking, the sharpest declines begin after January 2024: strip out the earlier data and the median rises from 50x to 200x. The decline is not slowing; it is accelerating.

Epoch's own caveat deserves repeating, because passing on a figure like that without one would mislead: the steepest falls occurred in the past year, so whether they continue is uncertain.

This decline is not magic. It is engineering, and it comes down to three things.

First, models are getting smaller. Architectures that do the same work with fewer parameters, and compression methods that store weights at lower precision, cut the cost of computation directly.

Second, the manner of generation is changing. Producing text is inherently serial: the model emits tokens one at a time, each waiting on the last. Speculative decoding breaks that chain — a small, fast "draft" model proposes several tokens ahead, and the large model verifies them in parallel, in a single pass. The paper introducing the method measured a two- to three-fold speed-up on T5-XXL and, critically, the outputs were identical. Speed is gained without surrendering quality.

Third, and least discussed: inference is not a compute problem, it is a memory-management problem. While generating, a model holds representations of previous tokens in memory; when many requests are served at once, each needs its own space. Much of the optimisation comes not from "more processing power" but from using that memory more intelligently.

When the three work together, what emerges is a curve familiar from the history of technology: the unit cost of a service falling exponentially over decades, without its quality falling with it.

Nordhaus's study of lighting is a long-run instance of the same curve. A thousand lumen-hours of light cost 785 dollars in 1800; by 1992 it had fallen to 23 cents. A decline of 99.97 percent. Nordhaus's real emphasis was this: because the fall was never fully captured in official statistics, economists understated actual growth. The value created by something whose price collapses is usually greater than what gets measured.

## The gain that waited thirty years

Return now to the figure we began with.

Electricity looks like the most obvious productivity leap in industrial history. It was not. Paul David's work shows that electrification produced no appreciable productivity gain for more than thirty years. The reason did not lie in the technology.

The nineteenth-century factory was built on "group drive": a single large power source — a water wheel or a steam engine — turned a long line shaft near the ceiling, and machines ran off that shaft through belts and pulleys. The layout of the factory was dictated by the power source; machines had to sit close to the shaft.

When electricity arrived, factories did the most reasonable thing available to them: they removed the steam engine and put a dynamo in its place. The shaft stayed. The belts stayed. The layout stayed. A new technical system had been laid over an old one.

The break came in the 1920s, and its name was "unit drive": a motor for every machine. That turned the motor from a replacement part into a change in the factory's design assumption. Machines could now be arranged not around the power source but **around the flow of materials**. What emerged was a bright, flexible, rearrangeable plant. In the 1920s, electrification alone accounted for roughly half of the productivity growth in manufacturing.

David's conclusion is the spine of this note: new technologies require complementary organisational change before they produce measurable productivity. Workflow, skills, management practice. Buying the motor was easy; rethinking the factory took thirty years.

What most companies are doing today is swapping the steam engine for a dynamo. A model is bolted onto an existing process: reports get summarised, emails drafted, the call centre partly automated. The process is the same process. The shaft is still on the ceiling.

## Experiential inference

Thinking through the second- and third-order effects of any large event is one of the lessons we have written about before.

Where today's models are weak is not knowledge but **depth**. In studying a diagnostics company, the point is not that the instrument is sold but that the kits it consumes generate recurring revenue; as the installed base of instruments grows, kit revenue snowballs. With many companies holding monopoly positions in a sector, today's models cannot tell you which one will hold a durable competitive advantage, or why. They cannot produce what it means, in hotel operations, to sell rooms early and put the cash to work elsewhere over the winter, then generate fresh inflows from poolside revenue in summer. Compare what an instructor wrote in 2022 with what they wrote in 2024 and the models cannot infer whether the mind has evolved, the filters have sharpened, or the person is going in circles.

These are not gaps in knowledge but gaps in inference. The model sees the data and cannot form the judgment.

**"Experiential knowledge and analysis are an expensive, scarce resource."** Studying a company in depth today demands time, experience and access; serious analysis is therefore rare, and that scarcity is itself a source of advantage.

## What is in the price

The consensus agrees that a great deal of money will be spent. Wall Street's expectation for hyperscaler capital expenditure in 2026 sits around 527 billion dollars; guidance from the five largest companies themselves runs between 635 and 690 billion, more than double the 2024 level.

What is interesting is that the consensus has been too low for two years running. According to a Goldman Sachs note, expectations in early 2024 and early 2025 implied capex growth of roughly 20 percent; the outcome exceeded 50 percent in both years.

So the idea that "a lot of money will be spent on AI" is in the price. That is not where we differ.

Where we differ is this: the market is pricing the spending and the infrastructure, and is not pricing **the change in the quality of decisions**. A company renting servers is measurable and reportable; a company redesigning its processes is not measurable and does not appear in a quarterly deck. It was the same with electrification: buying the dynamo showed up on the balance sheet, the move to unit drive did not. The gain came from the second.

## The strongest form of the counter-argument

The sharpest criticism of this thesis is not technological but accounting.

In 2025, revenue from AI-related services was roughly 25 billion dollars; over the same period more than 250 billion was spent on infrastructure. That is about ten cents of revenue for every capex dollar spent. By one estimate, hyperscalers additionally hold some 662 billion dollars of signed but not yet commenced data-centre lease commitments, which accounting standards keep off the balance sheet; that sum is larger than the same companies' total on-balance-sheet debt.

The objection is serious and has no easy answer. With railways and with fibre optic, the vision was correct too; most of those who put up the capital went under, and the gains fell to later owners.

The answer we can give is partial: the scale of the spending does not refute the thesis, it strikes at **the timing**. The cost curve operates independently of capex — algorithmic efficiency, smaller models and better memory management lower the cost without a single new data centre being built. But that answer does not resolve the question of who wins, and neither can we. We leave it open.

## The timing trap

Direction and date are different things. We are assertive about direction, humble about date.

The electrification example serves as a warning here. The direction was right in 1899. It was visible while the motor share climbed from five percent to fifty-five. The gain arrived twenty to thirty years later. In that interval, the difference between a correct thesis and mistaken timing is, for an investor, the difference between ruin and a fortune.

Being early is indistinguishable, in its consequences, from being wrong.

## Positioning

For us this view turns into a set of questions rather than a stock preference. When we look at a company we now also ask: is this management laying the technology over the existing process, or rebuilding the process? Are there technological waves it missed in the past, and if so, why did it miss them?

The question forces us to understand why a company in a monopoly position is genuinely protected — an exercise that tests the quality of our own inference. One mind reads the same data as "opportunity", another as "threat", a third as "noise"; the difference lies in the quality of the internal model. While the machines' inference grows cheaper, failing to improve our own would be a strange kind of laziness. We work on the quality of our own inference in earnest.

Everyone is trying to build the largest artificial intelligence; what we care about most are the AI companies focused on decision quality and on raising the quality of inference. We also watch the companies that follow this closely and keep integrating AI into their operations through their own rule-based, bespoke development.

Finally, we think that the poor inference produced by the human pull towards belonging — and the way it holds back the prosperity of communities — may be eased, at least somewhat, by artificial intelligence.

If the shaft is still on the ceiling, we are not interested.
