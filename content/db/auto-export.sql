CREATE TABLE IF NOT EXISTS betterbibtex.autoexport (
  path NOT NULL PRIMARY KEY,
  translatorID NOT NULL,
  type NOT NULL,
  id NOT NULL,
  recursive NOT NULL,
  enabled NOT NULL,
  status NOT NULL,
  error NOT NULL,
  updated NOT NULL
)
--
CREATE INDEX IF NOT EXISTS betterbibtex.autoexport_translatorID ON autoexport(translatorID)
--
CREATE INDEX IF NOT EXISTS betterbibtex.autoexport_type_id ON autoexport(type, id)
--
CREATE INDEX IF NOT EXISTS betterbibtex.autoexport_status ON autoexport(status)
--
CREATE TABLE IF NOT EXISTS betterbibtex.autoexportsetting (
  path NOT NULL,
  setting NOT NULL,
  value NOT NULL,
  PRIMARY KEY(path, setting),
  FOREIGN KEY(path) REFERENCES autoexport(path) ON DELETE CASCADE
)
--
CREATE INDEX IF NOT EXISTS betterbibtex.autoexportsetting_path ON autoexportsetting(path)
--
CREATE INDEX IF NOT EXISTS betterbibtex.autoexportsetting_setting ON autoexportsetting(path, setting)
