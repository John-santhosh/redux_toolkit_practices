import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    //action creator functions
    postAdded: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      // to simplify and abstract the process we are using prepare.
      // it will return the payload as need to be formatted.
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              },
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      console.log(existingPost);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

console.log(postSlice);

export const selectAllPosts = (state) => state.posts;
export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
