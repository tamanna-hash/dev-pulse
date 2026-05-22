export interface IIssue{
   
  id: number;
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface ICreateIssue {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  reporter_id: number;
}

export interface IUpdateIssue {
    title?: string;
    description?: string;
    type?: "bug" | "feature_request";
  }