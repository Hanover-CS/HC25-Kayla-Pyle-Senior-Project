# Main Features

This web app will act as a personal wiki-style organization platform meant for use my Game Masters and Authors who need help in organizing all the information regarding their games, worlds, story-lines, etc. Some key features of this web app will be:

<ul>
  <li>DashBoard Page</li>
  <ul>
    <li>Shows all created entries</li>
    <li>Can be search through filtered by type, folder, or name</li>
  </ul>
  <li>Wiki-Page Style Entries</li>
  <ul>
    <li>Title</li>
    <li>Summarizing text</li>
    <li>Related images</li>
    <li>In-text links to other related entries</li>
    <li>Each entry will be given a type</li>
    <ul>
      <li>There are default types such as character, event, place, etc.</li>
      <li>Users can add different categories</li>
    </ul>
  </ul>
  <li>Worlds will be sharable to other users</li>
  <ul>
    <li>World owners can hide certain information or full entires from those who they share with</li>
  </ul>
</ul>

# Similar Solutions

There exist many world-building web tools. A majority of them focus on particular details or pertain mostly to a particular audience. The examples that most closely resemble my project idea include World Anvil, Campfire, Kanka, and LegendKeeper. 

## World Anvil

**World Anvil** is by far the most popular of options. World Anvil offers slightly different experiences based on whether the user is a game master, author, writer, etc. It organizes information into articles, similar to my idea of entries, without the linking capability. Many features such as interactive maps, timelines, and more are hidden behind a paywall. A user's world is public to view, and World Anvil has a thriving community of users which offer the ability to look into their worlds and share ideas. [1] Although World Anvil is very popular and offers many different features that my project may not, I seek to streamline and have less clutter for my users, offering *fewer* (but free) features that are more specialized. Additionally, I want the user to be able to share their world with others, but privately without the weight of thousands of users having the ability to see it all.

![World Anvil Dashboard](/docs/proposal_images/worldanvil.png)

This is an image example of the World Anvil Dashboard, including all the feature options to the left. This dashboard focuses more on the community and less on the user's particular world. I consider the many features offered and ads make for an overwhelming first look.

## Campfire

**Campfire** is a world-building tool meant *specifically* for authors and allows for more than organizing ideas into characters, timelines, family trees, events, etc. It also offers the ability to publish chapters of an author's story to an online community. [2] My project will not focus so heavily on use by authors. I prefer more general use cases, so that different users may use the web app for different purposes. Similarly to World Anvil, my project will not offer a public/publishing feature, but also will be free to use.

![Campfire Features](/docs/proposal_images/campfire.png)  

This is a list of features and categories that Campfire offers to users. At least, it's most of them because they did not all fit onto one page.

![Campfire Community](/docs/proposal_images/campfireReading.png)

This is an example of some published works available to read on Campfire, showing how critical this community aspect of Campfire is to how it works. The world-building features are supporting publishing authors, not the main use of Campfire.

## Kanka

**Kanka**, unlike the first two, offers the majority of its features to users free. This site holds information in a similar style and does allow for links between entries, but *not* in an in-text wiki-style way. Additionally, the categories offered can be removed for users who find some to be unnecessary. [3] I was very inspired by Kanka when I discovered it. Similar to the other options above, I believe Kanka suffers from being a bit over-cluttered. Luckily, it has a way of dealing with that. I prefer to deal with it in the opposite direction, allowing users to add categories instead of them taking them away.

![Kanka](/docs/proposal_images/kankaLinks.png)

This is an example showing the way Kanka shows links and relationships that this setting "Genory" has to other entries. On the left you can also see some of the many categories and features Kanka offers.

## LegendKeeper

**LegendKeeper** is the solution I found most similar to my own, however it does require purchase as well. Information in LegendKeeper is organized in wiki-pages and links together entries in the in-text format. Each wiki-page can have multiple entries within it, and can be given tags rather than having set categories. Where the other options I investigated suffered from, in my opinion, a cluttered and overwhelming layout, I believe LegendKeeper suffers from the *opposite*. The site design is too simple and the more complex features and options are hidden away where many users may never really know about them. [4] In my project, I will not have multiple entries within each, and will use the idea of folders over tags for extra organization.

![LegendKeeper](/docs/proposal_images/legendkeeper.png)

This is an example of a simple wiki-page in LegendKeeper. Since LegendKeeper does not have a typical dashboard, what is seen here is nearly all there is to see on the LegendKeeper main screen. Most options are hidden until an entry is right-clicked or a button is hovered over.


# Relevant Technologies

<ol>
  <li>Platform</li>
  <ul>
    <li>Web App</li>
  </ul>
  <li>Language</li>
  <ul>
    <li>Javascript</li>
    <li>HTML</li>
    <li>CSS</li>
  </ul>
  <li>Database</li>
  <ul>
    <li>Graph Database</li>
  </ul>
  <li>Frameworks</li>
  <ul>
    <li>Next.js</li>
  </ul>
</ol>

## Why Did I Choose What I Did?

The choice of which **platform** I wanted my project to be an easy one. I was drawn to the web app or website route because of the accessibility. I did not want my users to need to download an *app*, or only have access to their world on one device. Instead, I figured a web-based project was the way to go. The decision between web app and website was pretty simple for me as well. *Websites* are powerful tools, great for displaying information or offering resources to visitors of the website. However, websites are quite stagnant and aren't meant for constant changes by the user or to save their data for long-term use and display. So, I chose **web app** for this project, with the intention to perhaps go the route of a pwa down the road.

There were many different choices available for which **language** to use. I investigated Javascript, Python, PHP, and Java. Of these, I was most comfortable and had the most experience with Java and Python. However, I had worked with Javascript most recently. Each language had several pros and cons. *Python* was simple and versatile, with vast resources, but has downsides that many of these languages shared: it was not built for web development and had fewer choices in frameworks. *PHP* was very popular and easily integrated with databases and web servers, however I had never worked with it before and it had scalability issues, which I may not have ever run into but it certainly played a part in my decision. *Java* was a close contender having great scalability and threading support as well as being highly secure, but like Python it was not standard, and offered significantly slower start times and higher memory consumption. **Javascript** offered the greatest resources as it is considered a standard for web app development, I was comfortable with it, it is supported by all major browsers, and the downsides it had I could not see myself running into. So, I decided to go with Javascript. [5, 6] In addition, to support my Javascript code, I will be using some *HTML*, and *CSS* for certain aesthetic advantages.

I knew I would need a **database** for my project. It would be simple to default to a *relational database*. However, my project will require complex links and relationships between data and entries. While possible to use a relational database, it would seem to me the process would need to be overly complicated to keep everything linked accurately and might be difficult to traverse these links quickly and efficiently. So, I went the route of a **graph database** instead. The way in which a graph database lays out and organizes information made most sense to me and looked to most like the data structuring I had in mind. The edges or relationships between nodes would be easy to name and give properties to, and would clearly connect all those related entries with ease. [7] As for which graph database I decided to use, I went with **Neo4j** for its free version which did not require me to have a private cloud, and its extensive learning and documentation pages to assist in overcoming the learning curve. [8]

For **frameworks**, there were many options out there compatible with javascript code. The two main frameworks I was deciding between were *next.js* and *angular.js*. AngularJs focused on code organization in a MVC format. [9] I found this type of organization to make a lot of sense, however I ultimately decided if I wanted to organize my code in that way, that is something I could do myself and did not necessarily need a framework for. I was drawn to Next.js because of its compatibility with the React library, which I fully intend to use, and appreciated that it made server connections and optimization easier. Where I did not feel the need to have help with my organization, I did feel the assistance with those elements would be incredibly helpful. NextJs is also incredibly popular with a lot of documentation and learning resources. [10]

# Components

figma and mermaid js for building mock ups

### References

[1] “Worldbuilding and RPG Campaign Management World Anvil,” www.worldanvil.com. https://www.worldanvil.com/

[2] “Campfire - Writing Software for Authors and Worldbuilders,” www.campfirewriting.com. https://www.campfirewriting.com/

[3] “Kanka,” app.kanka.io, 2024. https://app.kanka.io/

[4] “LegendKeeper,” Legendkeeper.com, 2024. https://app.legendkeeper.com/‌

[5] S. Shukla, “10 Best Languages for Web Development In 2024,” Intelivita, Feb. 19, 2024. https://www.intelivita.com/blog/web-development-languages/

[6] “Best Programming Languages for Web Development Computerscience.org,” www.computerscience.org, Sep. 28, 2022. https://www.computerscience.org/bootcamps/guides/programming-languages-web-development/#:~:text=Developers%20use%20web%20development%20languages

[7] Wikipedia Contributors, “Graph database,” Wikipedia, Nov. 22, 2019. https://en.wikipedia.org/wiki/Graph_database
‌
‌[8] “Take the Graph Data Modeling Fundamentals course with Neo4j GraphAcademy,” Neo4j.com, 2024. https://graphacademy.neo4j.com/courses/modeling-fundamentals 

[9] “JavaScript Libraries and Frameworks,” GeeksforGeeks, Nov. 29, 2023. https://www.geeksforgeeks.org/javascript-libraries-and-frameworks/

[10] Vercel, “Next.js by Vercel - The React Framework,” nextjs.org, 2024. https://nextjs.org/
‌

‌
