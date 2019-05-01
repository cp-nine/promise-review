# Review Promise - Case "Applicants"

Berikut adalah alur pendaftaran kerja, namun pada kasus ini saya menambahkan sedikit tambahan 
yaitu saat pertamakali submit data pelamar akan di review dulu oleh HR untuk melihat kecocokan dari Job Requirement nya

```
  1. Pelamar submit data ke HR
  2. HR Review CV pelamar **
  3. HR notif Pelamar untuk Psikotest atau ditlak
  4. Pelamar datang untuk Psikotest
  5. Pelamar menyerahkan hasil test ke HR
  6. HR followup hasil Psikotest ke User
  7. User konfirmasi ok ke HR soal Pelamar
  8. HR notif ke Pelamar untuk interview dengan User
  9. Pelamar datang ke User untuk interview
  10. User konfirmasi ok ke HR soal Pelamar lulus interview
  11. HR Notif ke Pelamar untuk mulai bekerja
  12. Pelamar mulai masuk bekerja
  
Contoh Perjalanan Test Jika Diterima
```
  1. Aplicants submit CV to HR...
  ---------------------------------
  2. CV review process...
  ---------------------------------
  3. HR give notification to applicants about Psikotest...
  SelectionResult { selection: 'HR', name: 'Ikhsan Fauji', value: null, next: true }
  ---------------------------------
  4. Applicants follow up Psikotest
  ---------------------------------
  5. Applicants give the result of Psikotest to HR
  SelectionResult {
    selection: 'Psikotest',
    name: 'Ikhsan Fauji',
    value: 56,
    next: true }
  ---------------------------------
  6. HR follow up psikotest result to User
  ---------------------------------
  7. User send confirmation Interview to HR
  ---------------------------------
  8. HR give notification to applicants about User Interview...
  SelectionResult {
    selection: 'User Verification',
    name: 'Ikhsan Fauji',
    value: 91,
    next: true }
  ---------------------------------
  9. Applicants follow up User Interview
  ---------------------------------
  10. User give confirmation about result of Interview to HR
  ---------------------------------
  11. HR give notification to applicants about the result of User Interview...
  ---------------------------------
  Accepted notification
  Congratulation you accepted in our company
  SelectionResult {
    selection: 'User Interview',
    name: 'Ikhsan Fauji',
    value: 80,
    next: true }
  ---------------------------------
  Welcome Ikhsan Fauji this is your first day.
  Happy working



Contoh Jika Ditolak, User juga dapat tahu pada proses seleksi mana dirinya ditolak
```
  1. Aplicants submit CV to HR...
  ---------------------------------
  2. CV review process...
  ---------------------------------
  3. HR give notification to applicants about Psikotest...
  SelectionResult { selection: 'HR', name: 'Ikhsan Fauji', value: null, next: true }
  ---------------------------------
  4. Applicants follow up Psikotest
  ---------------------------------
  5. Applicants give the result of Psikotest to HR
  SelectionResult {
    selection: 'Psikotest',
    name: 'Ikhsan Fauji',
    value: 97,
    next: true }
  ---------------------------------
  6. HR follow up psikotest result to User
  ---------------------------------
  7. User send confirmation Interview to HR
  ---------------------------------
  Reject notification
  You not acceepted
  SelectionResult {
    selection: 'User Verification',
    name: 'Ikhsan Fauji',
    value: 61,
    next: false }
  Reject notification
  You not acceepted
  SelectionResult {
    selection: 'User Verification',
    name: 'Ikhsan Fauji',
    value: 61,
    next: false }
