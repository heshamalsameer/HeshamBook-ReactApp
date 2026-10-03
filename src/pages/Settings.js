import { useState } from "react";
import { Box, Button, Card, Divider, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material";
import { DarkMode, Lock, Notifications, Person, Settings as Gear } from "@mui/icons-material";
import PageHeader from "./PageHeader";
import { useApp } from "../context/AppContext";

const Section = ({ icon, title, children }) => (
  <Card sx={{ p: 3, mb: 2.5 }} className="rise">
    <Stack direction="row" alignItems="center" gap={1} mb={2}>
      {icon}
      <Typography variant="h6">{title}</Typography>
    </Stack>
    {children}
  </Card>
);

const Settings = () => {
  const { user, setUser, mode, toggleMode, prefs, setPrefs, notify } = useApp();
  const [form, setForm] = useState({ name: user.name, handle: user.handle, bio: user.bio });
  const dirty = form.name !== user.name || form.handle !== user.handle || form.bio !== user.bio;
  const pref = (k) => ({ checked: !!prefs[k], onChange: (e) => setPrefs({ ...prefs, [k]: e.target.checked }) });

  return (
    <Box flex={1} p={{ xs: 1.5, sm: 2 }} maxWidth={760} mx="auto" width="100%">
      <PageHeader icon={<Gear />} title="Settings" subtitle="Manage your account and preferences" />

      <Section icon={<Person color="primary" />} title="Account">
        <Stack gap={2}>
          <TextField label="Display name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Username" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
          <TextField label="Bio" multiline rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button disabled={!dirty} onClick={() => setForm({ name: user.name, handle: user.handle, bio: user.bio })}>Reset</Button>
            <Button variant="contained" disabled={!dirty} onClick={() => { setUser({ ...user, ...form }); notify("Settings saved"); }}>Save changes</Button>
          </Stack>
        </Stack>
      </Section>

      <Section icon={<DarkMode color="primary" />} title="Appearance">
        <FormControlLabel control={<Switch checked={mode === "dark"} onChange={toggleMode} />} label="Dark mode" />
      </Section>

      <Section icon={<Notifications color="primary" />} title="Notifications">
        <Stack>
          <FormControlLabel control={<Switch {...pref("email")} />} label="Email notifications" />
          <FormControlLabel control={<Switch {...pref("push")} />} label="Push notifications" />
          <FormControlLabel control={<Switch {...pref("sounds")} />} label="Message sounds" />
        </Stack>
      </Section>

      <Section icon={<Lock color="primary" />} title="Privacy">
        <FormControlLabel control={<Switch {...pref("privateAccount")} />} label="Private account" />
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          When your account is private, only friends can see your posts and photos.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            try {
              Object.keys(localStorage).filter((k) => k.startsWith("circle-")).forEach((k) => localStorage.removeItem(k));
            } catch {
              /* ignore */
            }
            window.location.reload();
          }}
        >
          Reset demo data
        </Button>
      </Section>
    </Box>
  );
};

export default Settings;
