# PERTify
As I was reading Robert Cecil Martin's [*The Clean Coder*](https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073) I stumbled upon a section in chapter 10 about estimating tasks. Using [Project Evaluation and Review Technique (PERT)](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique) you can provide three values for a task: **O**ptimal, **N**ominal, and **P**essimistic, and generate how long it was expected to finish a task. I wanted to try it out, but didn't want to write all the equations when being asked to provide estimates. I could have used any of the PERT calculators out there, but like a typical developer, I set out to create a tool that fitted my needs, hence [PERTify](https://pertify.salhernandez.io/).

_This application is optimized for desktop screens!_

# Demo

![PERTify gif](https://github.com/salhernandez/pertify/blob/main/media/pertify.gif)

# PERT 

PERT is a statistical tool used in project management, which was designed to analyze and represent the tasks involved in completing a given project. The scheme provides a simple and effective way to convert estimates into probability distributions. For PERTify, we will be using tasks and subtasks, instead projects and tasks.

For an in depth explanation of the calculations, please visit [The Clean Coder: Estimation](https://codingjourneyman.com/2014/10/06/the-clean-coder-estimation/), [Wikipedia](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique) and [LinkedIn](https://www.linkedin.com/pulse/what-pert-how-can-we-use-dave-fourie-pmp-prince2-/).

# PERTify

For each row (**subtask**) you will see the calculated probability distribution (**μ**) and standard deviation of the probability distribution (**σ**). **σ** measures how uncertain the task is.
At the top left of the card you will find **μ sequence** which is the sum of all the subtasks' expected duration, and **σ sequence** which is the standard deviation for all the subtasks.

We will using hours as the unit of measurement.
**Alpha** is estimated to be done in 4.2 (**μ**) hours. However, the estimated time to finish **Alpha**, **Beta**, and **Gamma** is 14.2 (**μ sequence**) hours with a standard deviation of 3.1 (**σ sequence**) hours.

Using the standard deviation we can calculate different estimates:
- 14.2 hours
  - **μ sequence** + ( 0 * **σ sequence** )
- 17.3 hours
  - **μ sequence** + ( 1 * **σ sequence** )
- 20.4 hours
  - **μ sequence** + ( 2 * **σ sequence** )

The task is set to take 14.2 hours, or 17.3 hours, or 20.4 hours, etc... But will most likely take **14 hours** after rounding down **14.2**.

![PERTify static image](https://github.com/salhernandez/pertify/blob/main/media/pertify.png)


# What I learned
- How to use 
  - [Material-UI](https://material-ui.com/)
  - [DevExtreme React Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/data-formatting/)
  - [Tag Assistant Chrome Extension to Debug Google Analytics](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk)
  - [Google Analytics](https://analytics.google.com/)

# Links
- [GitHub Repository](https://github.com/salhernandez/pertify)
- [PERTify](https://pertify.salhernandez.io/)
- [The Clean Coder: Estimation](https://codingjourneyman.com/2014/10/06/the-clean-coder-estimation/)
- [Wikipedia](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)
- [LinkedIn](https://www.linkedin.com/pulse/what-pert-how-can-we-use-dave-fourie-pmp-prince2-/)


# Development
- This applications was developed using Node `v14.15.4` and [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- To run application clone repository and run the following commands:
  - `npm install`
  - `npm run start`