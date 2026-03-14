/**
 * toolsService.js
 *
 * Abstraction layer for all tool-related data access.
 * Currently returns local seed data.
 * When Supabase is connected, swap the implementations below
 * to query the `tools` table instead — no other files need to change.
 *
 * Supabase swap example:
 *   import { supabase } from './supabaseClient';
 *   const { data, error } = await supabase.from('tools').select('*');
 */

import { tools as localTools } from '../data/tools';

// ── Fetch all tools ──────────────────────────────────────────────────────────

export async function getAllTools() {
  // TODO: replace with → supabase.from('tools').select('*')
  return localTools;
}

// ── Fetch single tool by slug ────────────────────────────────────────────────

export async function getToolBySlug(slug) {
  // TODO: replace with → supabase.from('tools').select('*').eq('slug', slug).single()
  return localTools.find(t => t.slug === slug) ?? null;
}

// ── Fetch tools by category ──────────────────────────────────────────────────

export async function getToolsByCategory(category) {
  // TODO: replace with → supabase.from('tools').select('*').eq('category', category)
  if (!category || category === 'All') return localTools;
  return localTools.filter(t => t.category === category);
}

// ── Fetch tools by status ────────────────────────────────────────────────────

export async function getToolsByStatus(status) {
  // TODO: replace with → supabase.from('tools').select('*').eq('status', status)
  if (!status || status === 'All') return localTools;
  return localTools.filter(t => t.status === status);
}
