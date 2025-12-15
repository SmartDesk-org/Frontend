import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getClientMessages,
  toggleReadMessage,
  toggleImportantMessage,
  deleteMessage,
} from "../api/clientMessagesApi";

export const fetchMessages = createAsyncThunk(
  "clientMessages/fetch",
  async (_, { rejectWithValue }) => {
    console.log("📨 [Messages] Fetching client messages...");
    try {
      const res = await getClientMessages();
      console.log("✅ [Messages] Fetched:", res.data.data);
      return res.data.data;
    } catch (e) {
      console.error("❌ [Messages] Fetch failed", e);
      return rejectWithValue("Failed to load messages");
    }
  }
);

export const toggleRead = createAsyncThunk(
  "clientMessages/toggleRead",
  async (id) => {
    console.log(`📘 [Messages] Toggling read status for ID: ${id}`);
    await toggleReadMessage(id);
    return id;
  }
);

export const toggleImportant = createAsyncThunk(
  "clientMessages/toggleImportant",
  async (id) => {
    console.log(`⭐ [Messages] Toggling important for ID: ${id}`);
    await toggleImportantMessage(id);
    return id;
  }
);

export const removeMessage = createAsyncThunk(
  "clientMessages/delete",
  async (id) => {
    console.log(`🗑️ [Messages] Deleting message ID: ${id}`);
    await deleteMessage(id);
    return id;
  }
);

const slice = createSlice({
  name: "clientMessages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchMessages.pending, (s) => {
        console.log("⏳ [Messages] Loading started");
        s.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (s, a) => {
        console.log("🟢 [Messages] State updated with messages");
        s.loading = false;
        s.messages = a.payload;
      })
      .addCase(fetchMessages.rejected, (s, a) => {
        console.error("🔴 [Messages] Error:", a.payload);
        s.loading = false;
        s.error = a.payload;
      })

      // TOGGLE READ
      .addCase(toggleRead.fulfilled, (s, a) => {
        console.log(`📘 [Messages] Read toggled for ID: ${a.payload}`);
        const msg = s.messages.find(m => m.id === a.payload);
        if (msg) msg.isRead = !msg.isRead;
      })

      // TOGGLE IMPORTANT
      .addCase(toggleImportant.fulfilled, (s, a) => {
        console.log(`⭐ [Messages] Important toggled for ID: ${a.payload}`);
        const msg = s.messages.find(m => m.id === a.payload);
        if (msg) msg.isImportant = !msg.isImportant;
      })

      // DELETE
      .addCase(removeMessage.fulfilled, (s, a) => {
        console.log(`🗑️ [Messages] Removed ID: ${a.payload}`);
        s.messages = s.messages.filter(m => m.id !== a.payload);
      });
  },
});

export default slice.reducer;
