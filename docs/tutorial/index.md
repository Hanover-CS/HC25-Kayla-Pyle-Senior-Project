# Introduction

This tutorial hopes to help you set up and begin interacting with your neo4j aura instance with you next.js project! The neo4j site is a wonderful resource with a helpful guide on how to set up a neo4j driver and how to begin some simply queries. However, this tutorial seeks to give a deeper and more detailed guide into integrating this driver more seamlessly into your next project!

**Note:** There are several options when using a neo4j graphical database. The basic options are to have a full database, to be self or fully-managed, or to use an Aura DB instance. The second is less secure, but runs off their servers instead of you needing to run it on your own machine. This tutorial is specifically for the Aura DB instance option. Please visit and explore the [neo4j site](https://neo4j.com/) to ensure this is the best option for you before continuing in the tutorial.

# Goals

<ol>
  <li>Getting a Neo4j Aura Instance</li>
  <li>Set Up Neo4j Driver</li>
  <li>Using .env</li>
  <li>Putting The Driver Into A Class</li>
  <li>Querying The Database</li>
</ol>

# Prerequistes

<ul>
  <li>Node.js 18.18 or later</li>
  <li>Next.js framework</li>
</ul>

## Step 1 - Getting a Neo4j Aura Instance

Now that you've decided that the Aura instance is the best option for you and your project, let's get you set up with one!

This process starts on the [neo4j aura db home page](https://neo4j.com/product/auradb/). Which should look a bit like this:

![Main Page](/docs/tutorial/tutorial_images/AuraDBMainPage.png)

You want to click the "Start Free" button, which will lead you to a page to create your account. If you already have an account with neo4j, you can use those credentials here. Otherwise, please use the email and password best for you.

After creating an account and verifying your email, it will prompt you on which version of the aura db instance you'd like. These options should look a bit like this:

![Instance Options](/docs/tutorial/tutorial_images/AuraDBOptions.png)

There will be information regarding the different choices. Here I suggest you choose the option best for you and your project. The only truly free option is the first, and for the sake of this tutorial, that is the version we will be using.

Once you have selected what type of aura instance you'll be using, you will be given some important pieces of information.

First: A password, which you should copy and save somewhere where you will not lose it, this will become important later.

Second: A file, titled something simiarly to " Neo4j-b16d193f-Created-2024-11-12 " this file holds some important and sensitive information on how to connect to your database. Be sure to save this file in a place where only you can access it, but it will not be lost.

After this, you should find a page that looks like this:

![Dashboard](/docs/tutorial/tutorial_images/AuraDBDashboard.png)

*the instance seen in this example no longer exisits and was deleted after tht tutorial was made*

This is your aura instance dashboard, and once your Instance01 says that is is running, you offically have a free Neo4j Aura Instance set up and ready to use!
