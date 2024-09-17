# Summary

This web app will act as a personal wiki-style organization platform meant for use my Game Masters and Authors who need help in organizing all the information regarding their games, worlds, story-lines, etc. Each world will have a dashboard page, showing all created entries that can be searched through and filtered based on type, folder, or name. Each of these entries will act as a single wiki-page. It will have a title, summarizing text, related images, and within the text a user can link certain words or phrases to other related entries. Entries can be given a type: character, event, place, and more. Additionally, a user will have the ability to add different categories so that it may better fit their needs. Ideally, I will want these worlds to be sharable to other users, where the original owner of the world can decide what is visible and what is hidden from those they share it to.

# Similar Solutions

There exist many world-building web tools. A majority of them focus on particular details or pertain mostly to a particular audience. The examples that most closely resemble my project idea include World Anvil, Campfire, Kanka, and LegendKeeper. 

**World Anvil** is by far the most popular of options. World Anvil offeres slightly different experiences based on whether the user is a game master, author, writer, etc. It organizes information into articles, similar to my idea of entries, without the linking capability. Many feature such as interactive maps, timelines, and more are hidden behind a pay wall. A user's world is public to view, and World Anvil has a thriving community of users which offer the ability to look into their worlds and share ideas. [1] Although World Anvil is very popular and offers many different features that my project may not, I seek to streamline and have less clutter for my users, offering fewer (but free) features that are more sepcialized. Additionally, I want the user to be able to share their world with others, but privately without the weight of thousands of users having the ability to see it all.

**Campfire** is a world-building tool meant specifically for authors and allows for more than organizing ideas into characters, timelines, familty trees, events, etc. It also offers the ability to publish chapters of an author's story to an online community. [2] My project will not focus so heavily on use by authors. I prefer more general use cases, so that different users may use the web app for different purposes. Similarly to World Anvil, my project will not offer a public/publishing feature, but also will be free to use.

**Kanka**, unlike the first two, offers majority of it's feature to users free. This site holds information in a similar style and does allow for links between entries, but not in an in-text wiki-style way. Additionally, the categories offered can be removed for user who find some to be unnecessary. [3] I was very inspired by Kanka when I had discovered it. Similar to the other options above, I believe Kanka suffers from being a bit over-cluttered. Luckily, it has a way of dealing with that. I prefer to deal with it in the opposite direction, allow users to add categories instead of them taking them away.

**LegendKeeper** is the solution I found most similar to my own, however it does require purchase as well. Information in LegendKeeper is organized in wiki-pages and does link together entries in the in-text format. Each wiki-page can have multiple entries within it, and can be given tags rather than having set categories. Where the other options I investigated suffered from, in my opinion, a cluttered and overwhelming layout, I believe LegendKeeper suffers from the opposite. The site design is too simple and the more complex features and options are hidden away where many users may never really know about them. [4] In my project, I will not have multiple entires within each, and will use the idea of folders over tags for extra organization.


# Relevant Technologies

Much though has gone into exactly how I will be designing this project. MyWorld Wiki is going to be a **web app** written in mostly **javascript** code, supported by some **html** and **css**. The foundations of this web app will be built upon the **next.js framework**. This project relies heavily upon saved and stored information, which is connected through complex links and relationships. For this data storage, I will be using a **neo4j graph database**. It is for certain that I will use several libraries in the making of this project, and likely I will stumble upon more along the way. However, as of right now, I plan on surely using the **react** and **jQuery** libraries.

## Why Did I Choose What I Did?




### References

[1] [“Worldbuilding and RPG Campaign Management | World Anvil,” www.worldanvil.com. https://www.worldanvil.com/
‌](https://www.worldanvil.com/)

[2] [“Campfire - Writing Software for Authors and Worldbuilders,” www.campfirewriting.com. https://www.campfirewriting.com/
‌](https://www.campfirewriting.com/)

[3] [“Kanka,” app.kanka.io, 2024. https://app.kanka.io/
‌](https://app.kanka.io/)

[4] [“LegendKeeper,” Legendkeeper.com, 2024. https://app.legendkeeper.com/‌
](https://app.legendkeeper.com/)
