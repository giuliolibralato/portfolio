-- Monthly Budget · pega todo y dale Run. Devuelve una sola tabla (Supabase solo muestra el último resultado).
select 'meses con presupuesto' as metrica, count(*)::text as valor from public.docs where path like 'months/%'
union all select 'primer mes', min(path) from public.docs where path like 'months/%'
union all select 'último mes', max(path) from public.docs where path like 'months/%'
union all select 'última edición', max(updated_at)::date::text from public.docs
union all select 'ítems por mes (promedio)', round(avg(jsonb_array_length(data->'items')),1)::text from public.docs where path like 'months/%'
union all select 'ítems totales', sum(jsonb_array_length(data->'items'))::text from public.docs where path like 'months/%'
union all select 'pasos de cierre hechos / totales',
  (select count(*) from public.docs d, jsonb_each(d.data->'pasos') p where d.path like 'months/%' and p.value = 'true')::text || ' / ' ||
  (select count(*) from public.docs d, jsonb_each(d.data->'pasos') p where d.path like 'months/%')::text
union all select 'editores distintos', count(distinct updated_by)::text from public.docs
union all select 'documentos editados por cada editor', string_agg(c::text, ' · ') from (select count(*) c from public.docs group by updated_by) x;
