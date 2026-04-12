export interface UserSettingsProps {
  index: number;
  username: string;
  avatarInitial: string;
  tags: string[];
  onEditTags: () => void;
  onSignOut: () => void;
}

