export type ContactField = 'name' | 'email' | 'message' | 'captcha';

/** Result of the contact form action, as seen by the form component. */
export interface ContactFormState {
  success?: boolean;
  sendFailed?: boolean;
  errors?: readonly ContactField[];
  values?: Partial<Record<'name' | 'email' | 'company' | 'topic' | 'message', string>>;
}
