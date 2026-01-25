Personally summarized from AI planning ideas

# Data Access:
## Canvas API: 
- good but students need to generate own API token.
- no API for Learning Suite
- What if other schools use different platforms?

## Manual Entry (paste a url and AI extracts info):
- more work for the user

## iCal export:
- still work for the user
- less info, more limited

## Chrome extension:
- limited UI space
- seems most promising
- easiest way to get the syllabus and not making the user have to do anything

## web APP:
- more space
- may be harder to get data


# Priority Calculation and Breakdown (AI Generated):
Priority = (Grade Impact × Weight) + (Urgency Factor) + (Time Required / Time Available)

Where:

Grade Impact: How much will this affect final grade? (from syllabus)
Urgency Factor: Days until due (exponential decay—closer = higher)
Time Required: Estimated hours (crowdsourced or AI-estimated by assignment type)
Time Available: Student's input of available hours per day
Breaking Down Big Tasks

Use an LLM to suggest breakdowns based on:
Assignment type (paper → research, outline, draft, revise)
Time estimate (10 hrs → 5 sessions of 2 hrs)
Due date (work backward from deadline)
Could also crowdsource—"students who did this assignment typically spent..."
Learning from History

Track actual time spent vs. estimates
Adjust future predictions based on student's personal pace


# Visual Representation (AI Generated):

Layout Ideas (building on your mockup)

Weekly planner as the main view (like your mockup)
Task cards with visual size based on time estimate (bigger = longer)
Color coding by class or priority level
Progress indicators (partially completed tasks)
Key UX Principles

Reduce cognitive load: Don't show everything—surface what matters today
Drag-and-drop: Let students manually adjust if they disagree with AI
Quick wins visible: Show easy tasks they can knock out between classes
Tech Stack Options



