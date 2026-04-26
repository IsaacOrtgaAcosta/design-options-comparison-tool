"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createDesignOption } from "../../services/design-options.service";
import { parseCommaSeparatedList } from "../../utils/formatter";
import type { DesignOption } from "../../types";
import { mapDbToDesignOption } from "../../utils/map-db-to-design-options";

type CreateDesignOptionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (option: DesignOption) => void;
};

export const CreateDesignOptionDialog = ({
  open,
  onOpenChange,
  onCreated,
}: CreateDesignOptionDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");

  const [embodiedCarbon, setEmbodiedCarbon] = useState("");
  const [costEstimate, setCostEstimate] = useState("");
  const [daylightScore, setDaylightScore] = useState("");
  const [programFit, setProgramFit] = useState("");

  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setArea("");
    setEmbodiedCarbon("");
    setCostEstimate("");
    setDaylightScore("");
    setProgramFit("");
    setPros("");
    setCons("");
    setTags("");
    setNotes("");
    setReferenceUrl("");
    setError(null);
  };

  const handleCreate = async () => {
    try {
      setError(null);

      if (!name.trim() || !description.trim()) {
        setError("Name and description are required.");
        return;
      }

      if (!embodiedCarbon || !costEstimate || !daylightScore || !programFit) {
        setError("All metric fields are required.");
        return;
      }

      const carbon = Number(embodiedCarbon);
      const cost = Number(costEstimate);
      const daylight = Number(daylightScore);
      const fit = Number(programFit);

      if ([carbon, cost, daylight, fit].some(Number.isNaN)) {
        setError(
          "Carbon, cost, daylight and program fit must be valid numbers.",
        );
        return;
      }

      if (carbon < 0 || cost < 0) {
        setError("Carbon and cost cannot be negative.");
        return;
      }

      if (daylight < 1 || daylight > 10 || fit < 1 || fit > 10) {
        setError("Daylight and program fit must be between 1 and 10.");
        return;
      }

      setIsSaving(true);

      const createdRow = await createDesignOption({
        name: name.trim(),
        description: description.trim(),
        area: area.trim(),

        embodied_carbon: carbon,
        cost_estimate: cost,
        daylight_score: daylight,
        program_fit: fit,

        pros: parseCommaSeparatedList(pros),
        cons: parseCommaSeparatedList(cons),
        tags: parseCommaSeparatedList(tags),
        reference_url: parseCommaSeparatedList(referenceUrl),

        notes: notes.trim() || undefined,
        source: "manual",
      });

      const createdOption = mapDbToDesignOption(createdRow);
      onCreated(createdOption);
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      setError("Could not create the design option. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Option</DialogTitle>
          <DialogDescription>
            Create a new design option manually
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="border-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short description</Label>
          <Input
            id="description"
            className="border-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Input
            id="area"
            className="border-gray-400"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Housing, Office, Retrofit..."
          />
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="carbon">Carbon</Label>
            <div className="relative">
              <Input
                id="carbon"
                type="number"
                min="0"
                className="border-gray-400 pr-20"
                value={embodiedCarbon}
                onChange={(e) => setEmbodiedCarbon(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                kg CO₂e
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                €
              </span>
              <Input
                id="cost"
                type="number"
                min="0"
                className="border-gray-400 pl-7"
                value={costEstimate}
                onChange={(e) => setCostEstimate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="daylight">Daylight</Label>
            <Input
              id="daylight"
              type="number"
              min="1"
              max="10"
              step="1"
              className="border-gray-400"
              value={daylightScore}
              onChange={(e) => setDaylightScore(e.target.value)}
              placeholder="1 - 10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program-fit">Program fit</Label>
            <Input
              id="program-fit"
              type="number"
              min="1"
              max="10"
              step="1"
              className="border-gray-400"
              value={programFit}
              onChange={(e) => setProgramFit(e.target.value)}
              placeholder="1 - 10"
            />
          </div>
        </div>

        <hr className="my-4 border-t border-gray-200" />

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="pros">Pros</Label>
            <Input
              id="pros"
              className="border-gray-400"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="Good daylight, Low carbon"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple values with commas.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cons">Cons</Label>
            <Input
              id="cons"
              className="border-gray-400"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="High cost, Complex structure"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple values with commas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              className="border-gray-400"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="housing, timber, retrofit"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple values with commas.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              className="border-gray-400"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference-url">Reference URL</Label>
          <Input
            id="reference-url"
            className="border-gray-400"
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
            placeholder="https://example.com, https://another-source.com"
          />
          <p className="text-xs text-muted-foreground">
            Optional. Separate multiple URLs with commas.
          </p>
        </div>

        <DialogFooter className="flex justify-center sm:justify-center">
          <Button
            type="button"
            size="xl"
            className="w-full max-w-md cursor-pointer"
            onClick={handleCreate}
            disabled={isSaving}
          >
            {isSaving ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
