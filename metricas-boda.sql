-- Web de la boda · pega todo y dale Run. Devuelve una sola tabla.
select 'regalos visibles' as metrica, count(*)::text as valor from public.gifts where is_visible
union all select 'regalos marcados como recibidos', count(*)::text from public.gifts where is_received
union all select 'aportes totales', count(*)::text from public.contributions
union all select 'aportes confirmados', count(*)::text from public.contributions where status = 'confirmed'
union all select 'aportes pendientes', count(*)::text from public.contributions where status = 'pending'
union all select '% regalos con al menos un aporte',
  round(100.0 * (select count(distinct gift_id) from public.contributions where gift_id is not null and status <> 'cancelled')
        / nullif((select count(*) from public.gifts where is_visible), 0), 1)::text
union all select 'aportes generales (sin regalo)', count(*)::text from public.contributions where gift_id is null
union all select 'mensajes', count(*)::text from public.messages
union all select 'canciones recomendadas', count(*)::text from public.songs;
