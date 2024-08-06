import axios from "axios";
const koloApiKey = "AIzaSyB1Dpyx3oKo1Vec4lxE_sJGsUiVFnf9qu4";
const extraApiKey = "AIzaSyDb4-_fhnCK2oXqgYaxbFzGfFe5c9gdOaI";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
// const apikey = 'AIzaSyDb4-_fhnCK2oXqgYaxbFzGfFe5c9gdOaI';
("../../");
export const getYouTubeThumbnails = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCb4BvFRquPfEEmpwFYiMAog&key=${koloApiKey}&maxResults=20`;
  const response = await axios.get(url);
  // console.log("STATUS", response.status);
  const responseItems = response.data.items;
  // console.log("STATUS", response.data.items[0].snippet);
  return responseItems;
  //   const data = console.log('RETURNED DATA', Object.keys(response.data.items.snippet));
};
