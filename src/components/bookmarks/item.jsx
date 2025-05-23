import classNames from "classnames";
import ResolvedIcon from "components/resolvedicon";
import { useContext } from "react";
import { SettingsContext } from "utils/contexts/settings";

export default function Item({ bookmark, iconOnly = false }) {
  const description = bookmark.description ?? new URL(bookmark.href).hostname;
  const { settings } = useContext(SettingsContext);

  return (
    <li
      key={bookmark.name}
      id={bookmark.id}
      className={classNames("bookmark", iconOnly && "grid")}
      data-name={bookmark.name}
    >
      <a
        href={bookmark.href}
        title={bookmark.name}
        rel="noreferrer"
        target={bookmark.target ?? settings.target ?? "_blank"}
        className={classNames(
          settings.cardBlur !== undefined && `backdrop-blur${settings.cardBlur.length ? "-" : ""}${settings.cardBlur}`,
          "text-left cursor-pointer transition-all rounded-md font-medium text-theme-700 dark:text-theme-200 dark:hover:text-theme-300 shadow-md shadow-theme-900/10 dark:shadow-theme-900/20 bg-theme-100/20 hover:bg-theme-300/20 dark:bg-white/5 dark:hover:bg-white/10",
          iconOnly ? "h-[60px] w-[60px] grid" : "block w-full mb-3",
        )}
      >
        {iconOnly ? (
          <div className="flex items-center justify-center text-theme-700 hover:text-theme-700 dark:text-theme-200 text-xl font-medium rounded-md bookmark-icon py-0.5">
            {bookmark.icon && (
              <div className="w-7 h-7">
                <ResolvedIcon icon={bookmark.icon} alt={bookmark.abbr} />
              </div>
            )}
            {!bookmark.icon && bookmark.abbr}
          </div>
        ) : (
          <div className="flex">
            <div className="shrink-0 flex items-center justify-center w-11 bg-theme-500/10 dark:bg-theme-900/50 text-theme-700 hover:text-theme-700 dark:text-theme-200 text-sm font-medium rounded-l-md bookmark-icon">
              {bookmark.icon && (
                <div className="shrink-0 w-5 h-5">
                  <ResolvedIcon icon={bookmark.icon} alt={bookmark.abbr} />
                </div>
              )}
              {!bookmark.icon && bookmark.abbr}
            </div>
            <div className="flex-1 overflow-hidden flex items-center justify-between rounded-r-md bookmark-text">
              <div className="pl-3 py-2 text-xs bookmark-name">{bookmark.name}</div>
              <div className="shrink truncate px-2 py-2 text-theme-500 dark:text-theme-300 text-xs bookmark-description">
                {description}
              </div>
            </div>
          </div>
        )}
      </a>
    </li>
  );
}
