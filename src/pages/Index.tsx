import { useState, useMemo, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/files/150be872-406c-4d5c-b3e5-5070fef341f5.jpg';
const CASE_1 = 'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/files/aaa54fa1-007c-4713-8ddc-4a2f57ec5f4b.jpg';
const CASE_2 = 'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/files/a3f0a0b9-7014-4be5-a42c-db0ad47d3155.jpg';

const NAV = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Конфигуратор', href: '#configurator' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Услуги', href: '#services' },
  { label: 'Контакты', href: '#contacts' },
];

type ModuleType = {
  id: string;
  name: string;
  icon: string;
  price: number;
  area: number;
  color: string;
};

const MODULES: ModuleType[] = [
  { id: 'reception', name: 'Ресепшен', icon: 'Monitor', price: 45000, area: 4, color: 'hsl(33 96% 54%)' },
  { id: 'showcase', name: 'Витрина', icon: 'GalleryHorizontal', price: 28000, area: 3, color: 'hsl(210 70% 50%)' },
  { id: 'podium', name: 'Подиум', icon: 'Box', price: 22000, area: 2, color: 'hsl(168 60% 45%)' },
  { id: 'meeting', name: 'Переговорная', icon: 'Users', price: 60000, area: 9, color: 'hsl(270 50% 58%)' },
  { id: 'storage', name: 'Подсобка', icon: 'Archive', price: 18000, area: 4, color: 'hsl(0 0% 55%)' },
  { id: 'media', name: 'Медиа-стена', icon: 'MonitorPlay', price: 52000, area: 3, color: 'hsl(340 70% 55%)' },
  { id: 'lightwall', name: 'Световая стена', icon: 'Lightbulb', price: 38000, area: 3, color: 'hsl(55 95% 55%)' },
  { id: 'column', name: 'Колонна', icon: 'Columns3', price: 14000, area: 1, color: 'hsl(190 60% 50%)' },
  { id: 'arch', name: 'Арка', icon: 'Sunset', price: 26000, area: 2, color: 'hsl(20 80% 55%)' },
  { id: 'pedestal', name: 'Постамент', icon: 'PackageOpen', price: 12000, area: 1, color: 'hsl(168 50% 45%)' },
  { id: 'flowers', name: 'Цветник', icon: 'Flower2', price: 9000, area: 1, color: 'hsl(310 55% 58%)' },
  { id: 'photozone', name: 'Фотозона', icon: 'Camera', price: 35000, area: 6, color: 'hsl(240 60% 60%)' },
];

const CATALOG = [
  { name: 'Модульные стены', icon: 'LayoutPanelLeft', count: 32, images: [] },
  { name: 'Световые стенды и стены', icon: 'Lightbulb', count: 24, images: [
    'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/bucket/368e65e8-509a-4fac-aa4c-ba01ba58da88.png',
    'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/bucket/171fa6d5-5c30-4dcb-a56f-9343bea1e7d9.png',
    'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/bucket/ec9968f7-9129-48e1-940b-e6ed398a909f.png',
  ] },
  { name: 'Колонны и арки', icon: 'Columns3', count: 21, images: [] },
  { name: 'Витрины и подиумы', icon: 'GalleryVertical', count: 48, images: [] },
  { name: 'Постаменты для образцов', icon: 'Box', count: 33, images: [] },
  { name: 'Ресепшены', icon: 'Monitor', count: 19, images: [] },
  { name: 'Переговорные зоны', icon: 'Users', count: 14, images: [] },
  { name: 'Цветники', icon: 'Flower2', count: 16, images: [] },
  { name: 'Фотозоны', icon: 'Camera', count: 18, images: [] },
  { name: 'Мультимедиа', icon: 'MonitorPlay', count: 27, images: [] },
  { name: 'Мебель', icon: 'Armchair', count: 86, images: [] },
];

const SERVICES = [
  { icon: 'Truck', title: 'Доставка', text: 'Логистика на площадку по всей России точно ко времени монтажа.' },
  { icon: 'Wrench', title: 'Монтаж и демонтаж', text: 'Сборка стенда нашей бригадой и полный демонтаж после мероприятия.' },
  { icon: 'MessageSquare', title: 'Консультации', text: 'Подбор модулей под цели, бюджет и площадь вашего стенда.' },
];

const Index = () => {
  const [selected, setSelected] = useState<Record<string, number>>({ reception: 1, showcase: 2, podium: 1 });
  const [saved, setSaved] = useState(false);
  const contactsRef = useRef<HTMLDivElement>(null);

  const add = (id: string) => { setSelected((s) => ({ ...s, [id]: (s[id] || 0) + 1 })); setSaved(false); };
  const remove = (id: string) => {
    setSelected((s) => {
      const next = { ...s };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
    setSaved(false);
  };

  const saveAndScroll = () => {
    setSaved(true);
    contactsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const placed = useMemo(
    () => MODULES.flatMap((m) => Array.from({ length: selected[m.id] || 0 }, (_, i) => ({ ...m, key: `${m.id}-${i}` }))),
    [selected]
  );

  const total = useMemo(
    () => MODULES.reduce((sum, m) => sum + (selected[m.id] || 0) * m.price, 0),
    [selected]
  );
  const area = useMemo(
    () => MODULES.reduce((sum, m) => sum + (selected[m.id] || 0) * m.area, 0),
    [selected]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">М</div>
            <span className="font-display font-semibold tracking-wide text-lg">СТЕНД<span className="text-primary">·</span>МОДУЛЬ</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <Button className="font-display tracking-wide rounded-none">Заказать стенд</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-40" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/40 text-primary text-xs font-display tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Аренда выставочных стендов
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] uppercase text-balance">
              Соберите стенд <span className="text-primary">как конструктор</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Модули формируют пространство под ваши задачи: витрины, подиумы, ресепшены, переговорные. 3D-превью обновляется в реальном времени.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-display tracking-wide rounded-none glow-amber" asChild>
                <a href="#configurator"><Icon name="Boxes" className="mr-2" size={18} />Открыть конфигуратор</a>
              </Button>
              <Button size="lg" variant="outline" className="font-display tracking-wide rounded-none border-border" asChild>
                <a href="#cases">Смотреть кейсы</a>
              </Button>
            </div>
            <div className="mt-12 flex gap-8">
              {[['250+', 'модулей'], ['12 лет', 'на рынке'], ['800+', 'стендов в год']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-2xl text-foreground">{v}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-pop">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <img src={HERO_IMG} alt="Выставочный стенд" className="relative w-full aspect-square object-cover border border-border shadow-2xl" />
            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur border border-border p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Конфигурация «Бизнес»</div>
                <div className="font-display font-semibold">48 м² · 12 модулей</div>
              </div>
              <Icon name="Boxes" className="text-primary" size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="container py-20 border-t border-border">
        <SectionHead kicker="Каталог" title="Модули и оборудование" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-10">
          {CATALOG.map((c) => (
            <CatalogCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section id="configurator" className="py-20 border-t border-border bg-secondary/30">
        <div className="container">
          <SectionHead kicker="Интерактивный конфигуратор" title="Соберите стенд и смотрите превью" />
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-10">
            {/* модули */}
            <div className="bg-card border border-border p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-display">Доступные модули</div>
              <div className="space-y-2">
                {MODULES.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 border border-border bg-background/50">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: `${m.color}22`, color: m.color }}>
                      <Icon name={m.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.price.toLocaleString('ru')} ₽ · {m.area} м²</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => remove(m.id)} className="w-7 h-7 border border-border hover:bg-secondary flex items-center justify-center transition-colors disabled:opacity-30" disabled={!selected[m.id]}>
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-5 text-center font-display font-semibold text-sm">{selected[m.id] || 0}</span>
                      <button onClick={() => add(m.id)} className="w-7 h-7 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* превью + итоги */}
            <div className="bg-card border border-border p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-display">3D-превью стенда</div>
                <span className="inline-flex items-center gap-1.5 text-xs text-primary"><span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />в реальном времени</span>
              </div>

              <div className="relative flex-1 min-h-[280px] grid-texture border border-border bg-background overflow-hidden flex items-center justify-center p-6">
                {placed.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <Icon name="Boxes" size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Добавьте модули, чтобы собрать стенд</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 w-full" style={{ perspective: '600px' }}>
                    {placed.map((p, i) => (
                      <div
                        key={p.key}
                        className="aspect-square flex flex-col items-center justify-center gap-1 border animate-scale-pop"
                        style={{
                          background: `${p.color}1f`,
                          borderColor: `${p.color}66`,
                          color: p.color,
                          transform: 'rotateX(12deg)',
                          animationDelay: `${i * 30}ms`,
                        }}
                      >
                        <Icon name={p.icon} size={20} />
                        <span className="text-[9px] text-center leading-none px-1 text-muted-foreground">{p.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-px bg-border mt-4">
                {[['Площадь', `${area} м²`], ['Модулей', `${placed.length}`], ['Стоимость', `${(total / 1000).toFixed(0)}т ₽`]].map(([l, v]) => (
                  <div key={l} className="bg-card p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</div>
                    <div className="font-display font-bold text-lg text-foreground">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 font-display tracking-wide rounded-none"
                  size="lg"
                  onClick={saveAndScroll}
                >
                  <Icon name={saved ? 'CheckCheck' : 'FileText'} className="mr-2" size={18} />
                  {saved ? 'Конфигурация сохранена' : `Отправить заявку · ${total.toLocaleString('ru')} ₽`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="container py-20 border-t border-border">
        <SectionHead kicker="Кейсы" title="Реализованные стенды" />
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* Первый кейс — широкий, на всю ширину */}
          {(() => {
            const cases = [
              { img: 'https://cdn.poehali.dev/projects/bdff14cc-6a21-4e2e-8438-bfc3281c519c/bucket/fc8d74cd-1e04-45a5-9a85-d5d9cd45c8b0.jpeg', title: 'Корпорация развития Башкортостана', meta: 'Световые колонны · модульный стенд · ~80 м²', wide: true },
              { img: CASE_1, title: 'TechExpo 2025', meta: 'Стенд 36 м² · IT-компания', wide: false },
              { img: CASE_2, title: 'Industrial Forum', meta: 'Двухэтажный стенд 120 м²', wide: false },
            ];
            return cases.map((c) => (
              <div key={c.title} className={`group relative overflow-hidden border border-border hover-lift${c.wide ? ' md:col-span-2' : ''}`}>
                <img src={c.img} alt={c.title} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${c.wide ? 'aspect-[21/9]' : 'aspect-[16/10]'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-xs text-primary uppercase tracking-widest font-display">{c.meta}</div>
                  <h3 className="font-display font-bold text-2xl mt-1">{c.title}</h3>
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 border-t border-border bg-secondary/30">
        <div className="container">
          <SectionHead kicker="Услуги" title="Полный цикл под ключ" />
          <div className="grid md:grid-cols-3 gap-px bg-border mt-10">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-card p-8">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display font-semibold text-xl">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-border">
        <div ref={contactsRef} className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHead kicker="Контакты" title="Обсудим ваш стенд" />
            <p className="text-muted-foreground mt-4 max-w-sm">Оставьте заявку — менеджер подберёт конфигурацию модулей под ваше мероприятие и пришлёт смету.</p>
            <div className="mt-8 space-y-4">
              {[['Phone', '+7 (495) 000-00-00'], ['Mail', 'hello@stend-modul.ru'], ['MapPin', 'Москва, ЭкспоЦентр, Краснопресненская наб., 14']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <Icon name={icon} className="text-primary" size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <form className="bg-card border border-border p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя" placeholder="Иван Петров" />
              <Field label="Телефон" placeholder="+7 ___ ___-__-__" />
            </div>
            <Field label="Email" placeholder="you@company.ru" />
            <div>
              <label className="text-xs uppercase tracking-wide text-muted-foreground font-display">Задача</label>
              <textarea rows={3} placeholder="Стенд 40 м² на выставку, нужны витрины и переговорная..." className="mt-1.5 w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-primary transition-colors resize-none" />
            </div>

            {/* Блок конфигурации */}
            {saved && placed.length > 0 && (
              <div className="border border-primary/40 bg-primary/5 p-4 animate-fade-up">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-primary">
                    <Icon name="CheckCircle" size={14} />
                    Конфигурация из конфигуратора
                  </div>
                  <div className="text-xs text-muted-foreground">{area} м² · {placed.length} модулей</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {MODULES.filter((m) => selected[m.id]).map((m) => (
                    <span
                      key={m.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs border"
                      style={{ borderColor: `${m.color}66`, color: m.color, background: `${m.color}18` }}
                    >
                      <Icon name={m.icon} size={11} />
                      {m.name} ×{selected[m.id]}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-2 flex justify-between">
                  <span>Предварительная стоимость аренды</span>
                  <span className="font-display font-semibold text-foreground">{total.toLocaleString('ru')} ₽</span>
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full font-display tracking-wide rounded-none">
              <Icon name="Send" className="mr-2" size={18} />
              Отправить заявку
            </Button>
          </form>
        </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">М</div>
            <span className="font-display font-semibold tracking-wide">СТЕНД·МОДУЛЬ</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Стенд-Модуль. Аренда выставочных стендов и оборудования.</p>
        </div>
      </footer>
    </div>
  );
};

const CatalogCard = ({ name, icon, count, images }: { name: string; icon: string; count: number; images: string[] }) => {
  const [slide, setSlide] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="group bg-card hover:bg-secondary transition-colors cursor-pointer overflow-hidden">
      {hasImages ? (
        <div className="relative h-44 bg-background/60 border-b border-border overflow-hidden">
          <img
            src={images[slide]}
            alt={name}
            className="h-full w-full object-contain p-4 transition-all duration-500"
          />
          <span className="absolute top-3 right-3 text-xs text-muted-foreground font-display bg-card/80 px-2 py-0.5">{count} поз.</span>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setSlide((s) => (s - 1 + images.length) % images.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-card/80 hover:bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="ChevronLeft" size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSlide((s) => (s + 1) % images.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-card/80 hover:bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="ChevronRight" size={14} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === slide ? 'bg-primary w-3' : 'bg-muted-foreground/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}
      <div className="p-7">
        {!hasImages && (
          <div className="flex items-start justify-between mb-6">
            <Icon name={icon} className="text-primary group-hover:scale-110 transition-transform" size={32} />
            <span className="text-xs text-muted-foreground font-display">{count} поз.</span>
          </div>
        )}
        <h3 className="font-display font-semibold text-xl">{name}</h3>
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
          Смотреть <Icon name="ArrowRight" size={14} />
        </span>
      </div>
    </div>
  );
};

const SectionHead = ({ kicker, title }: { kicker: string; title: string }) => (
  <div>
    <div className="text-xs uppercase tracking-[0.2em] text-primary font-display">{kicker}</div>
    <h2 className="font-display font-bold text-3xl md:text-4xl uppercase mt-2 text-balance">{title}</h2>
  </div>
);

const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div>
    <label className="text-xs uppercase tracking-wide text-muted-foreground font-display">{label}</label>
    <input placeholder={placeholder} className="mt-1.5 w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
  </div>
);

export default Index;