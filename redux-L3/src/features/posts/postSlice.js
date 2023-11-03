import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "../../API/axios";
import { sub } from "date-fns";
const POSTS_URL = "/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  console.log(response);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    console.log({ initialPost });
    const response = await axios.post(POSTS_URL, initialPost);
    console.log(response);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    //action creator functions
    postAdded: {
      reducer: (state, action) => {
        state.posts.unshift(action.payload);
      },
      // to simplify and abstract the process we are using prepare.
      // it will return the payload as need to be formatted.
      prepare: (title, body, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
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
      console.log({ action });
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      console.log(existingPost);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        console.log({ action });

        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log({ action });
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log({ action });
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

console.log(postSlice);

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
