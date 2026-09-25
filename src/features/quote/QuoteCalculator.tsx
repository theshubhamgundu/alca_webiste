import { useState } from "react";
import type { SiteData } from "../../types/site";
import { openWhatsApp } from "../../lib/whatsapp";
import { rupees } from "../../lib/format";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import "../features.css";

export function QuoteCalculator({ site }: { site: SiteData }) {
  const q = site.quote;
  const [event, setEvent] = useState("");
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(Number(q.minGuests) || 50);
  const [food, setFood] = useState<"Veg" | "Non-veg">("Veg");
  if (!q.on) return null;

  const minGuests = Number(q.minGuests) || 50;
  const maxGuests = 1000;
  const types = q.types
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const total = guests * Number(food === "Veg" ? q.vegPlate : q.nonvegPlate);
  const canRequest = event !== "" && date !== undefined;

  return (
    <section
      className="feature-panel quote-calculator"
      aria-labelledby="quote-title"
    >
      <small className="quote-kicker">CATERING · QUICK ESTIMATE</small>
      <h3 id="quote-title">Quick quote estimate</h3>
      <p className="quote-intro">
        Plan your menu and guest count to see an instant food estimate.
      </p>
      <div className="feature-grid">
        <form
          className="quote-form"
          id="quote-request-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canRequest) return;
            openWhatsApp(
              site.contact.mainPhone,
              `Hello ALCA, I would like a catering quote.\nEvent: ${event}\nDate: ${format(date!, "PPP")}\nGuests: ${guests}\nFood: ${food} · ${rupees(total)}`,
            );
          }}
        >
          <label className="quote-field">
            <span className="quote-field-label">Event type</span>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              required
            >
              <option value="">Select your event type</option>
              {types.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="quote-field">
            <span className="quote-field-label">Event date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </label>

          <fieldset className="food-toggle">
            <legend>Food</legend>
            <button
              type="button"
              className="feature-button"
              onClick={() => setFood("Veg")}
              aria-pressed={food === "Veg"}
            >
              Veg · {rupees(q.vegPlate)}/plate
            </button>
            <button
              type="button"
              className="feature-button"
              onClick={() => setFood("Non-veg")}
              aria-pressed={food === "Non-veg"}
            >
              Non-veg · {rupees(q.nonvegPlate)}/plate
            </button>
          </fieldset>

          <label className="quote-field">
            <div className="section-row">
              <span>Guests</span>
              <span className="count-pill">
                {guests}
                {guests === maxGuests ? "+" : ""}
              </span>
            </div>
            <input
              aria-label="Number of guests"
              type="range"
              min={minGuests}
              max={maxGuests}
              step={10}
              value={guests}
              aria-valuetext={`${guests}${guests === maxGuests ? " or more" : ""} guests`}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
            <div className="range-scale">
              <span>Min {minGuests}</span>
              <span>{maxGuests}+</span>
            </div>
          </label>
        </form>

        <aside className="feature-card quote-total" aria-live="polite">
          <span className="quote-total-label">ESTIMATED FOOD TOTAL</span>
          <strong className="quote-total-amount">{rupees(total)}</strong>
          <p className="quote-total-detail">
            {guests} guests · {food} at{" "}
            {rupees(food === "Veg" ? q.vegPlate : q.nonvegPlate)}/plate
          </p>
          <button
            className="feature-button quote-submit"
            type="submit"
            form="quote-request-form"
            disabled={!canRequest}
          >
            {canRequest ? "Request quote on WhatsApp" : "Choose event details"}
          </button>
          {!canRequest && (
            <p className="quote-submit-hint">
              Select an event type and date to continue.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}