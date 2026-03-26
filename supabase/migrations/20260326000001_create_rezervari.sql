-- Creare tabel rezervări
CREATE TABLE rezervari (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nume TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  numar_persoane INTEGER NOT NULL DEFAULT 2,
  data DATE NOT NULL,
  ora TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'în așteptare',
  creat_la TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activare Row Level Security
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Politici: oricine poate adăuga, citi, modifica și șterge
CREATE POLICY "oricine poate citi" ON rezervari FOR SELECT USING (true);
CREATE POLICY "oricine poate adauga" ON rezervari FOR INSERT WITH CHECK (true);
CREATE POLICY "oricine poate modifica" ON rezervari FOR UPDATE USING (true);
CREATE POLICY "oricine poate sterge" ON rezervari FOR DELETE USING (true);
