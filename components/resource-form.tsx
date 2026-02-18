"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  useResources,
  type Resource,
  type ResourceType,
  type ResourceStatus,
  type ResourceProvider,
} from "@/lib/resource-context";

interface ResourceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource?: Resource | null;
}

interface FormData {
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  provider: ResourceProvider;
  region: string;
  cpu?: number;
  memory?: number;
  storage?: number;
  cost: number;
  tags: string[];
}

const regions = {
  aws: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
  gcp: ["us-central1", "us-west1", "europe-west1", "asia-east1"],
  azure: ["eastus", "westus", "westeurope", "southeastasia"],
};

export function ResourceForm({ open, onOpenChange, resource }: ResourceFormProps) {
  const { addResource, updateResource } = useResources();
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState<string[]>(resource?.tags || []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: resource
      ? {
          name: resource.name,
          type: resource.type,
          status: resource.status,
          provider: resource.provider,
          region: resource.region,
          cpu: resource.cpu,
          memory: resource.memory,
          storage: resource.storage,
          cost: resource.cost,
          tags: resource.tags,
        }
      : {
          name: "",
          type: "compute",
          status: "active",
          provider: "aws",
          region: "us-east-1",
          cost: 0,
          tags: [],
        },
  });

  const selectedProvider = watch("provider");
  const selectedType = watch("type");

  React.useEffect(() => {
    if (resource) {
      reset({
        name: resource.name,
        type: resource.type,
        status: resource.status,
        provider: resource.provider,
        region: resource.region,
        cpu: resource.cpu,
        memory: resource.memory,
        storage: resource.storage,
        cost: resource.cost,
        tags: resource.tags,
      });
      setTags(resource.tags);
    } else {
      reset({
        name: "",
        type: "compute",
        status: "active",
        provider: "aws",
        region: "us-east-1",
        cost: 0,
        tags: [],
      });
      setTags([]);
    }
  }, [resource, reset]);

  const onSubmit = (data: FormData) => {
    const resourceData = {
      ...data,
      tags,
      cpu: data.cpu || undefined,
      memory: data.memory || undefined,
      storage: data.storage || undefined,
    };

    if (resource) {
      updateResource(resource.id, resourceData);
    } else {
      addResource(resourceData);
    }

    onOpenChange(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const showCpuMemory = ["compute", "container"].includes(selectedType);
  const showStorage = ["compute", "storage", "database"].includes(selectedType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {resource ? "Edit Resource" : "Add New Resource"}
          </DialogTitle>
          <DialogDescription>
            {resource
              ? "Update the details of your cloud resource."
              : "Create a new cloud resource to manage."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              placeholder="e.g., Production Web Server"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={watch("type")}
                onValueChange={(value) => setValue("type", value as ResourceType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compute">Compute</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="container">Container</SelectItem>
                  <SelectItem value="serverless">Serverless</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value as ResourceStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={(value) => {
                  setValue("provider", value as ResourceProvider);
                  setValue("region", regions[value as ResourceProvider][0]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={watch("region")}
                onValueChange={(value) => setValue("region", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions[selectedProvider]?.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showCpuMemory && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpu">CPU (vCPU)</Label>
                <Input
                  id="cpu"
                  type="number"
                  placeholder="e.g., 4"
                  {...register("cpu", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memory">Memory (GB)</Label>
                <Input
                  id="memory"
                  type="number"
                  placeholder="e.g., 16"
                  {...register("memory", { valueAsNumber: true })}
                />
              </div>
            </div>
          )}

          {showStorage && (
            <div className="space-y-2">
              <Label htmlFor="storage">Storage (GB)</Label>
              <Input
                id="storage"
                type="number"
                placeholder="e.g., 100"
                {...register("storage", { valueAsNumber: true })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="cost">Monthly Cost ($)</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              placeholder="e.g., 150.00"
              {...register("cost", { valueAsNumber: true, required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={addTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{resource ? "Save Changes" : "Create Resource"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
