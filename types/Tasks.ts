// CReate priority Types / Levels
import React, { useState, useMemo } from "react";

export type Priority = "High" | "Medium" | "Low";
export type Categories = "Personal" | "Work" | "Personal";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  // add Prioruty
  priority?: Priority;
  category?: Categories;

  createdAt: Date;
}
