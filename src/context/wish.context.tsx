"use client";
import { useSession } from "next-auth/react";
import React, { Dispatch, createContext, useEffect, useReducer } from "react";

type StateType = {
  ids: { id: string; is: boolean }[];
};

type ActionType = {
  type: string;
  payload?: { id: string; is: boolean };
};

const initialState: StateType = {
  ids: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "WISH":
      const { id, is } = action.payload || {};
      const existingItem = state.ids.find((item) => item.id === id);

      if (existingItem) {
        const updatedIds = state.ids.map((item) =>
          item.id === id ? { ...item, is: !item.is } : item
        );
        return {
          ...state,
          ids: updatedIds,
        };
      } else {
        return {
          ...state,
          ids: [...state.ids, { id, is: is || false }],
        };
      }
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data }: any = useSession();

  const wishList = { ids: data?.user.id || [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
