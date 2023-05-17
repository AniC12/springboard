"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */


function generateStoryMarkup(story, showDeleteBtn = false) {
  console.debug("generateStoryMarkup");
  const showStar = Boolean(currentUser);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <br>
        <small class="story-author">by ${story.author}</small>
        <br>
        <small class="story-user">posted by ${story.username}</small>
        ${showDeleteBtn ? getDeleteBtn() : ""}
      </li>
      <hr>
    `);
}


function getStarHTML(story, user) {
  const starType = user.isFavorite(story) ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}



function getDeleteBtn() {
  return `<button type="submit" class="delete-btn">Delete</button>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function deleteStory(evt) {
  console.debug("deleteStory");

  const closestLi = $(evt.target).closest("li");
  const storyId = closestLi.attr("id");
  await storyList.removeStory(currentUser, storyId);
  putUserStoriesOnPage();
}

$myStories.on("click", ".delete-btn", deleteStory);
/* Submit new story form */



async function submitStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();

  const storyData = { title, author, url };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $storySubmit.hide();
  $storySubmit.trigger("reset");
}

$storySubmit.on("submit", submitStory);



function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $myStories.empty();

  if (currentUser.ownStories.length === 0) {
    $myStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $myStories.append($story);
    }
  }

  $myStories.show();
}



function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoritedStories.empty();
  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorite stories!</h5>");
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }

  $favoritedStories.show();
}


async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const storyId = $(evt.target).closest("li").attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($(evt.target).hasClass("fas")) {
    await currentUser.removeFavorite(story);
    $(evt.target).closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $(evt.target).closest("i").toggleClass("fas far");
  }
}

$allStoriesList.on("click", ".star", toggleStoryFavorite);
