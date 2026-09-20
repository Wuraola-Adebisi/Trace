import type { Importance, NodeKind, TraceEdge, TraceExample, TraceNode } from '../types'
import { DEFAULT_KIND_LABELS } from '../types'

type Extra = Pick<TraceNode, 'tag' | 'role' | 'when'>

const mk =
  (kind: NodeKind) =>
  (
    id: string,
    label: string,
    importance: Importance,
    match: string[],
    why: string,
    extra: Extra = {},
  ): TraceNode => ({ id, label, kind, importance, match, why, ...extra })

const topic = mk('topic')
const person = mk('person')
const decision = mk('decision')
const question = mk('question')

const link = (from: string, to: string, relation?: string): TraceEdge => ({ from, to, relation })

/* ------------------------------------------------------------------ */
/* 1. Product launch meeting (the flagship dataset)                    */
/* ------------------------------------------------------------------ */

const launchContent = `Product launch meeting, 12 August. Present: Sarah (business development), James (product), Priya (engineering), Daniel (marketing), Amara (finance) and Leo (customer success).
We're thinking about launching the product in September, with 16 September as the working date. Sarah thinks we should start with small businesses because enterprise sales could take too long. James wants to test universities first because the campus pilot in June had strong engagement.
Sarah's case for small businesses is speed. A small shop can sign up in a week, and she already knows five prospects who would try the product. James disagrees. Small businesses churn quickly, while the campus pilot showed students returning three times a week. He thinks universities give cleaner retention data before we spend on sales. Sarah accepted that retention matters but said a September launch with no paying customers would look weak to investors.
Priya said the payment infrastructure isn't ready for a larger launch yet. The current checkout handles about 200 transactions a day, and a small-business launch could push that past 1,000. The card processor migration needs six more weeks, which lands in late September at best. Her team also has to finish the invoice export before any paying customer can use the product for accounting. Priya does not want to rush payments because refunds are the hardest part to get right.
Daniel said the campaign is already prepared for September. Creative is approved, the launch emails are scheduled, and the agency has taken a deposit. Moving the date means rebooking ad slots, and the cheapest October slots are gone. He asked whether we could run the campaign in September and point it at the waitlist instead of live signups. Leo said the waitlist has 340 people and that support cannot onboard more than about 50 new accounts a week.
Amara raised the budget. Campaign spend is committed until 30 August, after which cancellation costs go up. She also pointed out that a second university pilot is cheaper than a small-business sales push, because pilots are free for the first semester. She asked for the revenue September needs to bring in, and nobody could give a number. Sarah's estimate was 12 paying accounts, while James thought retention would matter more than the count.
Leo flagged that support has no onboarding guide for small businesses, since the campus pilot ran with hands-on help from James. Onboarding time was the biggest complaint from pilot students. Leo will draft an onboarding guide if we go with small businesses.
We agreed to run another university pilot while engineering finishes payments. James will own the pilot and recruit two more campuses. Sarah will investigate five small-business prospects and check whether they would accept a paid start in October. Priya will send a firm date for the processor migration by 19 August. We also agreed that no paying customers will be onboarded until refunds are tested. Daniel will keep the campaign assets and ask the agency what a two-week delay would cost.
We need to decide by 20 August whether September is still realistic. Still unresolved: whether a waitlist launch counts as a launch, and what revenue target the board expects for the quarter. Amara will ask the board chair about the target. Next meeting is 20 August.`

const launch: TraceExample = {
  id: 'product-meeting',
  name: 'Product meeting',
  blurb: 'Six people, two competing launch plans, one blocked dependency.',
  input: { title: 'Product launch meeting', content: launchContent },
  result: {
    title: 'Product launch meeting',
    rootId: 'launch',
    summary:
      'The team is preparing for a September launch but has not agreed on a first market. Sarah wants small businesses and James wants universities. Payment infrastructure will not be ready for a larger launch, while the marketing campaign is already committed. The group agreed to run another university pilot and to hold back paying customers until refunds are tested. Whether September is still realistic has to be settled by 20 August.',
    kindLabels: DEFAULT_KIND_LABELS,
    nodes: [
      topic('launch', 'September launch', 'high', ['september'], 'Every other topic is measured against this date. The working date is 16 September, and the group meets again on 20 August to confirm it.', { when: '16 September' }),
      topic('uni', 'University pilot', 'high', ['universit', 'campus', 'pilot'], "James's preferred first step. The June campus pilot had strong engagement, and a second pilot is cheaper because pilots are free for the first semester."),
      topic('smb', 'Small businesses', 'high', ['small business', 'small shop', 'small-business'], "Sarah's preferred first market. Sign-up is fast, but James expects high churn and support has no onboarding guide for these customers yet."),
      topic('pay', 'Payment infrastructure', 'high', ['payment', 'processor', 'checkout', 'refund'], 'The main blocker. Checkout handles about 200 transactions a day, and the processor migration needs six more weeks.'),
      topic('campaign', 'Marketing campaign', 'medium', ['campaign', 'ad slots', 'agency'], 'Already prepared for September. Moving the date means rebooking ad slots, and the cheapest October slots are gone.'),
      topic('budget', 'Budget and revenue', 'medium', ['budget', 'campaign spend', 'revenue', 'cancellation'], 'Campaign spend is committed until 30 August. Nobody could name the revenue September needs to bring in.', { when: '30 August' }),
      topic('onboarding', 'Onboarding', 'medium', ['onboard'], 'Support can take about 50 new accounts a week and has no guide for small businesses. Onboarding time was the biggest pilot complaint.'),
      topic('retention', 'Retention', 'medium', ['retention', 'churn', 'returning'], 'The reason James wants universities first. Students returned three times a week in the pilot, while small businesses are expected to churn.'),

      person('sarah', 'Sarah', 'high', ['Sarah'], 'Argues for small businesses. Will investigate five prospects and check whether they would accept a paid start in October.', { role: 'Business development' }),
      person('james', 'James', 'high', ['James'], 'Argues for universities first. Owns the next pilot and will recruit two more campuses.', { role: 'Product, pilot owner' }),
      person('priya', 'Priya', 'medium', ['Priya'], 'Reports that payments are not ready. Will send a firm processor migration date by 19 August.', { role: 'Engineering', when: '19 August' }),
      person('daniel', 'Daniel', 'medium', ['Daniel'], 'Owns the campaign. Proposed pointing it at the waitlist and will ask the agency what a two-week delay would cost.', { role: 'Marketing' }),
      person('amara', 'Amara', 'medium', ['Amara'], 'Raised budget limits and asked for a revenue number. Will ask the board chair about the target.', { role: 'Finance' }),
      person('leo', 'Leo', 'medium', ['Leo'], 'Flagged the onboarding gap and the 340-person waitlist. Will draft an onboarding guide if small businesses go first.', { role: 'Customer success' }),

      decision('d1', 'Second university pilot', 'high', ['another university pilot'], 'Agreed as the next step while engineering finishes payments. James owns it.'),
      decision('d2', 'Refunds tested first', 'high', ['until refunds are tested'], 'No paying customers will be onboarded until refunds have been tested. This protects the riskiest part of payments.'),
      decision('d3', 'Price a two-week delay', 'medium', ['two-week delay'], 'Daniel keeps the campaign assets and asks the agency what a two-week delay would cost.'),

      question('q1', 'Is September realistic?', 'high', ['whether september is still realistic'], 'Depends on the processor migration date and on whether a waitlist launch is acceptable. Must be decided by 20 August.', { when: '20 August' }),
      question('q2', 'Waitlist launch enough?', 'medium', ['waitlist'], 'Daniel wants to run the campaign against the 340-person waitlist. Support can only onboard about 50 accounts a week.'),
      question('q3', 'Board revenue target?', 'medium', ['revenue target', 'revenue september needs'], 'Nobody could name the revenue September needs to bring in. Sarah estimated 12 paying accounts.'),
    ],
    edges: [
      link('launch', 'uni', 'first-market option'),
      link('launch', 'smb', 'first-market option'),
      link('launch', 'pay', 'blocked by'),
      link('launch', 'campaign', 'scheduled for'),
      link('launch', 'budget', 'limited by'),
      link('launch', 'onboarding', 'needs'),
      link('launch', 'q1', 'unresolved'),
      link('uni', 'retention', 'gives data on'),
      link('uni', 'd1', 'next step'),
      link('uni', 'james', 'owned by'),
      link('smb', 'sarah', 'argued by'),
      link('smb', 'retention', 'risk of churn'),
      link('pay', 'priya', 'reported by'),
      link('pay', 'd2', 'condition'),
      link('pay', 'd1', 'in the meantime'),
      link('pay', 'q1', 'decides'),
      link('campaign', 'daniel', 'owned by'),
      link('campaign', 'd3', 'follow-up'),
      link('campaign', 'q2', 'depends on'),
      link('daniel', 'd3', 'will ask agency'),
      link('budget', 'amara', 'raised by'),
      link('budget', 'q3', 'unknown'),
      link('amara', 'q3', 'will ask board chair'),
      link('onboarding', 'leo', 'raised by'),
      link('onboarding', 'q2', 'capacity limit'),
      link('james', 'd1', 'owns'),
    ],
  },
}

/* ------------------------------------------------------------------ */
/* 2. Research interview                                               */
/* ------------------------------------------------------------------ */

const interviewContent = `Customer interview with Maya Bello, who runs a two-person bakery. Interviewer: Ife. Conducted 3 September.
Maya spends about six hours a week chasing invoices. Most of her wholesale customers pay late, and she tracks who owes her in a spreadsheet that her sister Ronke updates on Sundays. When a payment is missed she often finds out weeks later.
She wants to stop feeling embarrassed about chasing customers. A reminder that comes from the software instead of from her would help, because her wholesale buyers are also friends.
She has tried two invoicing apps. Both were built for freelancers and could not handle recurring weekly orders. She dropped the second one after a month because entering each order by hand took longer than the spreadsheet.
Maya is worried about cost and would not pay more than 15 dollars a month. She does not trust apps that ask for bank access. She also asked whether her data could be exported if she leaves.
Her main request is recurring orders that generate invoices automatically. She also wants reminders that customers can reply to, and a weekly summary of who owes her money. Ife said the summary is already planned. Ronke would need her own login.`

const interview: TraceExample = {
  id: 'research-interview',
  name: 'Research interview',
  blurb: 'A customer talks through pain points, objections and requests.',
  input: { title: 'Customer interview: Maya Bello', content: interviewContent },
  result: {
    title: 'Customer interview: Maya Bello',
    rootId: 'chasing',
    summary:
      'Maya loses about six hours a week chasing late invoices and dislikes reminding customers who are also friends. Two earlier invoicing apps failed because they could not handle recurring weekly orders. She asks for recurring orders that create invoices on their own, reminders customers can reply to, and a weekly summary of what she is owed. Price, bank access and data export are her objections.',
    kindLabels: { topic: 'Pains and needs', person: 'People', decision: 'Requests', question: 'Objections' },
    nodes: [
      topic('chasing', 'Chasing invoices', 'high', ['invoic'], 'The core problem: about six hours a week spent following up on payments.', { tag: 'Pain point' }),
      topic('late', 'Late payments', 'high', ['pay late', 'payment is missed', 'owes'], 'Most wholesale customers pay late, and Maya often finds out weeks after a payment is missed.', { tag: 'Pain point' }),
      topic('sheet', 'Spreadsheet tracking', 'medium', ['spreadsheet'], 'Everything is tracked by hand in one spreadsheet, updated weekly by her sister.', { tag: 'Pain point' }),
      topic('awkward', 'Awkward reminders', 'high', ['embarrassed', 'reminder', 'friends'], 'Her buyers are also friends. A reminder sent by software takes the awkwardness off her.', { tag: 'Motivation' }),
      topic('apps', 'Earlier apps failed', 'medium', ['invoicing apps', 'freelancers', 'dropped', 'by hand'], 'Both apps were built for freelancers. She dropped the second after a month because manual entry was slower than the spreadsheet.', { tag: 'Pain point' }),
      topic('recurring', 'Recurring orders', 'high', ['recurring'], 'Wholesale customers order the same items every week, which the earlier apps could not represent.', { tag: 'Need' }),

      person('maya', 'Maya', 'high', ['Maya'], 'Runs a two-person bakery and is the person being interviewed.', { role: 'Bakery owner' }),
      person('ronke', 'Ronke', 'low', ['Ronke'], 'Updates the spreadsheet on Sundays. Would need her own login to any new tool.', { role: "Maya's sister" }),
      person('ife', 'Ife', 'low', ['Ife'], 'Ran the interview and confirmed the weekly summary is already planned.', { role: 'Interviewer' }),

      question('price', 'Max 15 dollars a month', 'high', ['15 dollars', 'worried about cost'], 'A hard price ceiling set by Maya.', { tag: 'Objection' }),
      question('bank', 'No bank access', 'medium', ['bank access'], 'She does not trust apps that ask to connect to her bank.', { tag: 'Objection' }),
      question('export', 'Can she export data?', 'medium', ['exported'], 'She wants to know she can leave with her data.', { tag: 'Objection' }),

      decision('r1', 'Auto-invoice orders', 'high', ['recurring orders that generate'], 'Her main request: standing weekly orders that produce invoices without manual entry.', { tag: 'Request' }),
      decision('r2', 'Replyable reminders', 'medium', ['reminders that customers can reply'], 'Reminders customers can answer directly, sent from the software rather than from Maya.', { tag: 'Request' }),
      decision('r3', 'Weekly owed summary', 'medium', ['weekly summary'], 'A weekly view of who owes her money. Already planned, according to Ife.', { tag: 'Request' }),
    ],
    edges: [
      link('chasing', 'late'),
      link('chasing', 'sheet'),
      link('chasing', 'awkward'),
      link('chasing', 'apps'),
      link('chasing', 'recurring'),
      link('chasing', 'maya', 'described by'),
      link('chasing', 'ife', 'interviewed by'),
      link('maya', 'price', 'objects'),
      link('maya', 'bank', 'objects'),
      link('maya', 'export', 'objects'),
      link('sheet', 'ronke', 'updated by'),
      link('recurring', 'r1', 'requested as'),
      link('awkward', 'r2', 'requested as'),
      link('late', 'r3', 'requested as'),
      link('apps', 'recurring', 'failed on'),
      link('ife', 'r3', 'says it is planned'),
    ],
  },
}

/* ------------------------------------------------------------------ */
/* 3. Project brief                                                    */
/* ------------------------------------------------------------------ */

const briefContent = `Project brief: Harbour Lane Books website relaunch.
Harbour Lane Books is relaunching its website before the holiday season. The goals are to move online orders off the current shop plugin and to double newsletter signups by December.
Ngozi, the owner, approves everything. Kelechi manages the shop floor and supplies the product data. Hannah, a freelance designer, delivers the page designs. Musa builds the site and sets up payments.
Deliverables: a new homepage with product pages, a checkout flow, and an events calendar page. Designs are due 30 September. The build must be finished by 28 October so there are two weeks of testing before the 11 November launch.
The build depends on Kelechi's product data, which is spread across three spreadsheets. Checkout also depends on the bank approving the merchant account, which has taken up to five weeks for other shops.
The budget cannot go above 4,000 pounds.
Open items: whether the events calendar is part of the launch or comes later, and who writes the product descriptions.`

const brief: TraceExample = {
  id: 'project-brief',
  name: 'Project brief',
  blurb: 'Goals, deadlines and the dependencies that could move them.',
  input: { title: 'Project brief: Harbour Lane relaunch', content: briefContent },
  result: {
    title: 'Project brief: Harbour Lane relaunch',
    rootId: 'root',
    summary:
      'Harbour Lane Books needs a new website live on 11 November. Designs are due on 30 September and the build on 28 October. The build depends on product data that is still spread across three spreadsheets, and checkout depends on a merchant account that can take up to five weeks to approve. Two items are open: whether the events calendar launches with the site and who writes the product descriptions.',
    kindLabels: { topic: 'Goals and constraints', person: 'Stakeholders', decision: 'Deliverables', question: 'Open items' },
    nodes: [
      topic('root', 'Website relaunch', 'high', ['relaunch'], 'The whole project. It has to be live before the holiday season.'),
      topic('g1', 'Move orders off plugin', 'high', ['move online orders', 'shop plugin'], 'Online orders currently run through a shop plugin that the new site replaces.', { tag: 'Goal' }),
      topic('g2', '2x newsletter signups', 'medium', ['newsletter'], 'The second goal, measured by December.', { tag: 'Goal' }),
      topic('time', 'Timeline', 'high', ['30 september', '28 october', '11 november', 'two weeks of testing', 'holiday season'], 'Designs on 30 September, build on 28 October, launch on 11 November. Two weeks are reserved for testing.', { tag: 'Deadline', when: '11 November' }),
      topic('budget', 'Budget cap', 'medium', ['budget', '4,000'], 'The budget cannot go above 4,000 pounds.', { tag: 'Constraint' }),
      topic('data', 'Product data', 'high', ['product data', 'three spreadsheets', 'product descriptions'], 'The build cannot start properly until the data is cleaned up. It currently lives in three spreadsheets.', { tag: 'Dependency' }),
      topic('merchant', 'Merchant account', 'high', ['merchant account', 'bank approving'], 'Checkout cannot go live until the bank approves the account, which has taken up to five weeks for other shops.', { tag: 'Dependency' }),

      person('ngozi', 'Ngozi', 'high', ['Ngozi'], 'Approves everything, including spend.', { role: 'Owner' }),
      person('kelechi', 'Kelechi', 'medium', ['Kelechi'], 'Supplies the product data and manages the shop floor.', { role: 'Shop manager' }),
      person('hannah', 'Hannah', 'medium', ['Hannah'], 'Delivers the page designs by 30 September.', { role: 'Freelance designer', when: '30 September' }),
      person('musa', 'Musa', 'medium', ['Musa'], 'Builds the site and sets up payments.', { role: 'Developer' }),

      decision('dhome', 'Homepage and products', 'high', ['homepage', 'product pages'], 'The main pages of the new site, designed by Hannah and fed by the product data.'),
      decision('dcheck', 'Checkout flow', 'high', ['checkout'], 'Replaces the plugin. Depends on the merchant account being approved.'),
      decision('dcal', 'Events calendar', 'low', ['events calendar'], 'Listed as a deliverable, but the brief also asks whether it belongs in the launch.'),

      question('q1', 'Calendar in launch?', 'medium', ['whether the events calendar'], 'Unclear whether the events calendar ships on 11 November or comes later.'),
      question('q2', 'Who writes descriptions?', 'medium', ['who writes the product descriptions'], 'No owner has been named for product descriptions, which the product pages need.'),
    ],
    edges: [
      link('root', 'g1'),
      link('root', 'g2'),
      link('root', 'time'),
      link('root', 'budget'),
      link('root', 'data'),
      link('root', 'merchant'),
      link('g1', 'dcheck', 'delivered by'),
      link('g2', 'dcal', 'supported by'),
      link('data', 'dhome', 'feeds'),
      link('data', 'kelechi', 'supplied by'),
      link('data', 'q2', 'needs an owner'),
      link('time', 'hannah', 'designs due'),
      link('time', 'q1', 'affects scope'),
      link('budget', 'ngozi', 'approved by'),
      link('merchant', 'musa', 'set up by'),
      link('musa', 'dcheck', 'builds'),
      link('dcheck', 'merchant', 'waits on'),
      link('hannah', 'dhome', 'designs'),
      link('q1', 'dcal', 'about'),
    ],
  },
}

/* ------------------------------------------------------------------ */
/* 4. Lecture notes                                                    */
/* ------------------------------------------------------------------ */

const lectureContent = `Lecture 4: supply and demand.
The lecture covered how prices form in a market. Demand describes how much of a good buyers want at each price. When the price rises, quantity demanded usually falls. Supply describes how much sellers offer at each price, and quantity supplied usually rises with price.
Equilibrium is the price where quantity demanded equals quantity supplied. Alfred Marshall's cross diagram, drawn in the lecture, shows equilibrium at the point where the two curves meet. If the price sits above equilibrium there is a surplus, and sellers cut prices. Below equilibrium there is a shortage, and prices rise.
Concert tickets were the main example. A sold-out show has fixed venue capacity, so its supply curve cannot move and higher demand raises the price. Resale markets show this directly.
Elasticity measures how strongly quantity responds to price. Petrol is inelastic in the short term because people still need to drive. Restaurant meals are more elastic because diners can switch.
Adam Smith's invisible hand was mentioned as the historical idea behind self-correcting markets.
Left over: what happens when buyers do not know the price, and how price controls such as rent caps change a shortage. The lecture ran out of time.`

const lecture: TraceExample = {
  id: 'lecture-notes',
  name: 'Lecture notes',
  blurb: 'Concepts, definitions, examples and what the lecturer left open.',
  input: { title: 'Lecture 4: Supply and demand', content: lectureContent },
  result: {
    title: 'Lecture 4: Supply and demand',
    rootId: 'price',
    summary:
      'Lecture 4 explains how prices settle where buyer demand and seller supply meet. Surplus and shortage describe the two ways a price can miss equilibrium, and elasticity explains why some goods react more than others to price changes. Two questions were left over: how markets work when buyers do not know the price, and how price controls affect a shortage.',
    kindLabels: { topic: 'Concepts', person: 'People', decision: 'Definitions', question: 'Unanswered' },
    nodes: [
      topic('price', 'Price formation', 'high', ['price'], 'The subject of the whole lecture: how a market arrives at a price.', { tag: 'Concept' }),
      topic('demand', 'Demand', 'high', ['demand'], 'How much buyers want at each price. Quantity demanded usually falls as price rises.', { tag: 'Concept' }),
      topic('supply', 'Supply', 'high', ['supply'], 'How much sellers offer at each price. Quantity supplied usually rises with price.', { tag: 'Concept' }),
      topic('equil', 'Equilibrium', 'high', ['equilibrium'], 'The price where quantity demanded equals quantity supplied, shown where the two curves meet.', { tag: 'Concept' }),
      topic('elast', 'Elasticity', 'medium', ['elastic'], 'How strongly quantity responds to a change in price.', { tag: 'Concept' }),
      topic('concert', 'Concert tickets', 'medium', ['concert', 'sold-out', 'resale'], 'A sold-out show has fixed supply, so higher demand pushes the price up.', { tag: 'Example' }),
      topic('petrol', 'Petrol', 'low', ['petrol'], 'Inelastic in the short term because people still need to drive.', { tag: 'Example' }),
      topic('rest', 'Restaurant meals', 'low', ['restaurant'], 'More elastic than petrol because diners can switch.', { tag: 'Example' }),

      person('marshall', 'Alfred Marshall', 'low', ['Alfred Marshall'], 'Source of the cross diagram used to show equilibrium.', { role: 'Economist' }),
      person('smith', 'Adam Smith', 'low', ['Adam Smith'], 'The invisible hand was mentioned as the historical idea behind self-correcting markets.', { role: 'Economist' }),

      decision('surplus', 'Surplus', 'medium', ['surplus'], 'Price above equilibrium. Sellers offer more than buyers want, so they cut prices.'),
      decision('shortage', 'Shortage', 'medium', ['shortage'], 'Price below equilibrium. Buyers want more than sellers offer, so prices rise.'),

      question('q1', 'Unknown prices?', 'medium', ['do not know the price'], 'What happens when buyers cannot see the price was left for another session.'),
      question('q2', 'Price controls?', 'medium', ['price controls'], 'How rent caps and similar controls change a shortage was not covered.'),
    ],
    edges: [
      link('price', 'demand'),
      link('price', 'supply'),
      link('price', 'equil'),
      link('price', 'elast'),
      link('price', 'smith', 'historical idea'),
      link('supply', 'concert', 'example of fixed supply'),
      link('elast', 'petrol', 'inelastic'),
      link('elast', 'rest', 'more elastic'),
      link('equil', 'surplus', 'above it'),
      link('equil', 'shortage', 'below it'),
      link('equil', 'marshall', 'drawn by'),
      link('equil', 'q1', 'open'),
      link('equil', 'q2', 'open'),
      link('demand', 'equil', 'meets supply at'),
      link('supply', 'equil', 'meets demand at'),
      link('demand', 'concert', 'rising demand'),
      link('shortage', 'q2', 'affected by'),
      link('smith', 'equil', 'self-correcting'),
    ],
  },
}

export const EXAMPLES: TraceExample[] = [launch, interview, brief, lecture]

export const LAUNCH_EXAMPLE = launch
