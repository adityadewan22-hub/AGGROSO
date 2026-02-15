1. Hi , Next step is a small build task. You will build a working web app and share: 1. a live link (hosted app) 2. a GitHub repo link You can use AI tools (ChatGPT, Cursor, Copilot, Claude, etc.). Please use them. But you must understand what you submit. Deadline Please submit within 48 hours of this email. If you cannot do it in the next 48 hours, reply once with RESCHEDULE and suggest a date/time that works for you. We will send you a different project and a new 48-hour window. (Only one reschedule.) Expected effort: 2 - 8 hours, based on your experience and agent speed. You can make it your own, but basic problem statement should be solved. Problem statement A: Tasks Generator (mini planning tool) Build a web app where I can: _ fill a small form about a feature idea (goal, users, constraints) _ generate a list of user stories and engineering tasks _ edit, reorder, and group tasks _ export the result (copy/download as text or markdown) _ see the last 5 specs I generated Make it your own: for example, add templates (mobile/web/internal tool) or “risk/unknowns” section. Problem statement B: CSV Insights Dashboard (small reporting app) Build a web app where I can: _ upload a CSV file _ preview the data (table view) _ generate a short “insights” summary (trends, outliers, what to check next) _ save the report and view the last 5 reports _ export the report (copy/download) Make it your own: for example, add simple charts, column selection, or “ask follow-up question” box.  What to include _ A simple home page with clear steps _ A status page, that shows health of backend, database, and llm connection. _ Basic handling for empty/wrong input _ A short README: how to run, what is done, what is not done _ A short AI_NOTES.md: what you used AI for, and what you checked yourself. Which LLM and provider does your app use and why. _ Put your name and resume in ABOUTME.md _ A PROMPTS_USED.md, with records of your prompts used for app developemnt. Don’t include agent responses, api keys, etc. Hosting requirement _ Hosting is important for this role. _ Keep the app live after you submit. _ If you truly cannot host, you may submit without hosting only if: _ the repo runs with one command using Docker, and _ you explain why hosting was not possible _ This will be scored lower than a hosted submission. _ If your link is down during review, you get one chance to fix it. Rules for Github repo _ Do not put API keys or passwords in the code. _ Use a .env.example file for settings. How we review We will open the live link and try a few actions. Then we will read your GitHub repo. We look for: _ it works and is easy to use _ clean code _ basic checks and testing _ sensible use of AI (not blind copy-paste) Reply to this email with: _ which project you chose (A or B) _ your live link \* your GitHub link Let me know if you have any doubts. All the best. We are doing option number B in fastapi backend. What should my db be for simplicity? Postgres?

2. ⭐ DB SQLite is PERFECT here. Do not touch Postgres unless deploying on something like Supabase effortlessly. isnt postgres more easily deployable? or is sqlite just better
3. we are doing option b, give me a roadmap in terms of wins to get to the complete product with time needed for each win as well

4. so how do i know what kind of table to put it in. like what takes headings what doesn’t
5. but my prompt for the insights generation would need to be very generalised then since i dont know what kind of data he is actually going to add
6. preview the data (table view) _ generate a short “insights” summary (trends, outliers, what to check next) _ save the report and view the last 5 reports when he says this does he mean the insights report or the csv table?
7. but then my schema would need to be very generalised as well. filename generated insights summary timestamp something like this.
8. okay lets start with win 1
9. give me win2
10. why download html templates ? the frontend is going to be next.js, also doesnt pandas add file upload support
11. give me updated win 2
12. okay and we need to feed structured metadata instead of the entire csv table to the llm right?
13. give me win 3
14. win 4 is basically writing a call_gemini function, adding a generate_insights wrapper function on top of it and then calling it in main with our structured data right?
15. INFO: 127.0.0.1:47846 - "POST /api/generate-insights HTTP/1.1" 500 Internal Server Error I think gemini variable is causing this
16. okay give me win 6
17. File "/home/adityad23/.local/lib/python3.10/site-packages/fastapi/routing.py", line 1332, in include_router for r in router.routes: AttributeError: module 'app.routes.reports' has no attribute 'routes'. Did you mean: 'router'?
18. but it works for health , insights etc
19. http://127.0.0.1:8000/api/reports Server response Code Details 200 Response body Download [ { "id": 1, "filename": "unknown.csv", i didnt get the summary } ]

20. how many wins are left
21. add a next js frontend in the wins after win 7
22. win 6
23. win 7
24. isnt this duplicated logic from /health
25. win 8
26. give me win 9
27. win 10
28. win 11
29. win 12 is just render and vercel right?
30. git add . fatal: in unpopulated submodule 'frontend' (venv) adityad23@MSI:~/assignments/aggroso/frontend$
31. how to deploy sqllite
32. ERROR: Could not find a version that satisfies the requirement cloud-init==25.1.4 (from versions: none) [notice] A new release of pip is available: 25.3 -> 26.0.1 [notice] To update, run: pip install --upgrade pip ERROR: No matching distribution found for cloud-init==25.1.4 ==> Build failed 😞 ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
33. (venv) adityad23@MSI:~/assignments/aggroso/backend$ pip freeze > requirements.txt i ran from my venv though
34. Installing backend dependencies: started Menu Installing backend dependencies: finished with status 'done' Preparing metadata (pyproject.toml): started Preparing metadata (pyproject.toml): still running... Preparing metadata (pyproject.toml): still running... its getting stuck at meta data
35. ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 20.3/20.3 MB 29.0 MB/s 0:00:00 Installing build dependencies: started Installing build dependencies: finished with status 'done' Getting requirements to build wheel: started Getting requirements to build wheel: finished with status 'done' Installing backend dependencies: started Installing backend dependencies: finished with status 'done' Preparing metadata (pyproject.toml): started it still uses 3.14 after runtime.txt
36. there is no python version option on render
37. write me a clean readme with headings for this app
